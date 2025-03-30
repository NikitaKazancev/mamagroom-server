/* eslint-disable no-console */
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { BreedService } from 'src/entities/breed/breed.service'
import { ProcedureService } from 'src/entities/procedure/procedure.service'
import { FileService } from 'src/file/file.service'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { Language } from 'src/utils/constants'
import { AIService } from './ai/ai.service'
import { ResponseFromAIService } from './response-from-ai/response-from-ai.service'

export type RequestBody = {
	userDescription?: string
	imageUrl?: string
}

@Injectable()
export class IntegrationService {
	constructor(
		private readonly breedService: BreedService,
		@Inject(forwardRef(() => ProcedureService))
		private readonly procedureService: ProcedureService,
		private readonly responseFromAIService: ResponseFromAIService,
		private readonly aiService: AIService,
		private readonly fileService: FileService
	) {}

	async procedureIdsByUserData({
		userDescription,
		imageName,
		language,
	}: {
		userDescription?: string
		imageName?: string
		language?: Language
	}) {
		const res = {
			procedureIds: [],
			breedId: '',
		}

		if (!userDescription && !imageName) {
			return res
		}

		let imageUrl: string | undefined
		if (imageName) {
			imageUrl = this.fileService.fullFileUrl(FILE_PATHS.forAI, imageName)
		}

		if (userDescription) {
			const dataInDb = await this.responseFromAIService.findMany({
				userDescription,
			})
			if (dataInDb.length) {
				res.breedId = dataInDb[0].breedId
				res.procedureIds = dataInDb[0].procedures.map(
					procedure => procedure.id
				)
				return res
			}
		}

		if (!language) language = 'ru'

		const detectedBreedData = await this.detectedBreedByUserData({
			imageUrl,
			userDescription,
			language,
		})

		if (!detectedBreedData.data) {
			await this.responseFromAIService.create({
				model: detectedBreedData.aiModel,
				userDescription: userDescription ? userDescription : undefined,
				imageName: imageName ? imageName : undefined,
				breedId: undefined,
				procedureIds: [],
			})

			return res
		}

		const procedureIdsData = await this.detectedProceduresByUserData({
			userDescription,
			imageUrl,
			detectedBreed: detectedBreedData.data,
			language,
		})

		await this.responseFromAIService.create({
			model: procedureIdsData.aiModel
				? procedureIdsData.aiModel
				: detectedBreedData.aiModel,
			userDescription: userDescription ? userDescription : undefined,
			imageName: imageName ? imageName : undefined,
			breedId: detectedBreedData.data.id,
			procedureIds: procedureIdsData.data,
		})

		res.procedureIds = procedureIdsData.data
		res.breedId = detectedBreedData.data.id
		return res
	}

	private async detectedBreedByUserData({
		imageUrl,
		userDescription,
		language,
	}: RequestBody & { language?: Language }) {
		const breedsInDb: { name: string; id: string }[] =
			await this.breedService.findMany(
				{ isDeleted: false, language },
				{ name: true, id: true }
			)

		if (!breedsInDb.length) {
			return {
				aiModel: undefined,
				data: undefined,
			}
		}

		const { systemText, requestText } = this.requestTextToDetectBreed(
			userDescription,
			breedsInDb,
			!!imageUrl
		)

		const response = await this.aiService.request({
			systemText,
			text: requestText,
			imageUrl,
		})
		if (!response.data) {
			return {
				aiModel: response.model,
				data: undefined,
			}
		}

		const detectedBreedIndex = Number(response.data.replace(/\D+/g, '')) - 1
		if (detectedBreedIndex < 0 || detectedBreedIndex >= breedsInDb.length) {
			return {
				aiModel: response.model,
				data: undefined,
			}
		}

		return {
			aiModel: response.model,
			data: {
				id: breedsInDb[detectedBreedIndex].id,
				name: breedsInDb[detectedBreedIndex].name,
			},
		}
	}

	private requestTextToDetectBreed(
		userDescription: string,
		breedsInDb: { id: string; name: string }[],
		fileExists: boolean
	) {
		let requestText: string
		if (fileExists && userDescription) {
			requestText = `Прочти описание пользователя, просмотри приложенное изображение и выдели породу собаки, о которой идет речь:
			"""${userDescription}"""`
		} else if (fileExists) {
			requestText = `Просмотри приложенное изображение и выдели породу собаки на нем:`
		} else {
			requestText = `Прочти описание пользователя и выдели породу собаки, о которой идет речь:
			"""${userDescription}"""`
		}

		const systemText =
			'Ты эксперт в области кинологии, собаководства и груминга.'
		const end = `В качестве ответа отправь ТОЛЬКО НОМЕР ПОРОДЫ: ${breedsInDb.map((breed, i) => `${i + 1}. ${breed.name}`).join(', ')}
		P.S. Если подходящей породы не оказалось, отправь номер той породы, которая ближе всего подходит.`

		requestText = `${requestText}
		
		${end}`

		return {
			systemText,
			requestText,
		}
	}

	private async detectedProceduresByUserData({
		userDescription,
		imageUrl,
		detectedBreed,
		language,
	}: RequestBody & {
		detectedBreed: { id: string; name: string }
		language?: Language
	}) {
		const proceduresInDb = await this.procedureService.findByBreed(
			detectedBreed.id,
			language
		)
		if (proceduresInDb.length <= 3) {
			return {
				aiModel: undefined,
				data: proceduresInDb.map(procedure => procedure.id),
			}
		}

		const { systemText, requestText } = this.requestTextToDetectProcedure(
			userDescription,
			detectedBreed.name,
			!!imageUrl,
			proceduresInDb
		)

		const response = await this.aiService.request({
			systemText,
			text: requestText,
			imageUrl,
		})
		if (!response.data) {
			return {
				aiModel: response.model,
				data: [],
			}
		}

		const detectedProcedureIndexes = response.data
			.split(' ')
			.map(index => Number(index.replace(/\D+/g, '')) - 1)
			.filter(index => index > 0 && index <= proceduresInDb.length)
		if (!detectedProcedureIndexes.length) {
			return {
				aiModel: response.model,
				data: [],
			}
		}

		const detectedProcedures = proceduresInDb.filter((_, i) =>
			detectedProcedureIndexes.includes(i)
		)

		return {
			aiModel: response.model,
			data: detectedProcedures.map(procedure => procedure.id),
		}
	}

	private requestTextToDetectProcedure(
		userDescription: string,
		detectedBreedName: string,
		fileExists: boolean,
		proceduresInDb: { id: string; name: string }[]
	) {
		let requestText: string
		if (fileExists && userDescription) {
			requestText = `Прочти описание пользователя, посмотри приложенное изображение и предложи 2-3 подходящие услуги груминга для указанной породы "${detectedBreedName}":
			"""${userDescription}"""`
		} else if (fileExists) {
			requestText = `Посмотри приложенное изображение и предложи 2-3 подходящие услуги груминга для указанной породы "${detectedBreedName}"`
		} else {
			requestText = `Прочти описание пользователя и предложи 2-3 подходящие услуги груминга для указанной породы "${detectedBreedName}":
			"""${userDescription}"""`
		}

		const systemText =
			'Ты эксперт в области кинологии, собаководства и груминга.'
		const end = `В качестве ответа отправь ТОЛЬКО НОМЕРА УСЛУГ ЧЕРЕЗ ПРОБЕЛ:
		${proceduresInDb.map((procedure, i) => `${i + 1}. ${procedure.name}`).join(', ')}`

		requestText = `${requestText}
		
		${end}`

		return {
			systemText,
			requestText,
		}
	}
}
