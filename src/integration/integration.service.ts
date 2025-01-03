/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { BreedService } from 'src/entities/breed/breed.service'
import { ProcedureService } from 'src/entities/procedure/procedure.service'
import { FILE_PATHS } from 'src/file/utils/file.constants'
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
		private readonly procedureService: ProcedureService,
		private readonly responseFromAIService: ResponseFromAIService,
		private readonly aiService: AIService
	) {}

	async procedureIdsByUserData({
		userDescription,
		imageName,
	}: {
		userDescription?: string
		imageName?: string
	}) {
		if (!userDescription && !imageName) {
			return []
		}

		let imageUrl: string | undefined
		if (imageName) {
			imageUrl = `./static/${FILE_PATHS.forAI}${imageName}`
		}

		const dataInDb = await this.responseFromAIService.findMany({
			userDescription,
		})
		if (dataInDb.length) {
			return dataInDb[0].procedures.map(procedure => procedure.id)
		}

		const detectedBreed = await this.detectedBreedByUserData({
			imageUrl,
			userDescription,
		})

		if (!detectedBreed) {
			await this.responseFromAIService.create({
				breedId: detectedBreed.id,
				userDescription,
				procedureIds: [],
				imageName: '',
			})

			return []
		}

		const procedureIds = await this.detectedProcedureByUserData({
			userDescription,
			imageUrl,
			detectedBreed,
		})

		await this.responseFromAIService.create({
			breedId: detectedBreed.id,
			userDescription,
			procedureIds,
			imageName,
		})

		return procedureIds
	}

	private async detectedBreedByUserData({
		imageUrl,
		userDescription,
	}: RequestBody) {
		const breedsInDb: { name: string; id: string }[] =
			await this.breedService.findMany(
				{ isDeleted: false, language: 'ru' },
				{ name: true, id: true }
			)

		const { systemText, requestText } = this.requestTextToDetectBreed(
			userDescription,
			breedsInDb,
			!!imageUrl
		)
		const response = await this.aiService.request({
			systemText,
			text: requestText,
		})
		if (!response) {
			return undefined
		}

		const detectedBreedIndex = Number(response) - 1
		if (detectedBreedIndex < 0 || detectedBreedIndex >= breedsInDb.length) {
			return undefined
		}

		return {
			id: breedsInDb[detectedBreedIndex].id,
			name: breedsInDb[detectedBreedIndex].name,
		}
	}

	private requestTextToDetectBreed(
		userDescription: string,
		breedsInDb: { id: string; name: string }[],
		fileExists: boolean
	) {
		let requestText: string
		if (fileExists && userDescription) {
			requestText = `Прочти описание пользователя, просмотри приложенное изображение и выдели породу собаки, о которой идет речь:\n
			"""${userDescription}"""`
		} else if (fileExists) {
			requestText = `Просмотри приложенное изображение и выдели породу собаки на нем:`
		} else {
			requestText = `Прочти описание пользователя и выдели породу собаки, о которой идет речь:\n
			"""${userDescription}"""`
		}

		const systemText =
			'Ты эксперт в области кинологии, собаководства и груминга.'
		const end = `В качестве ответа отправь ТОЛЬКО НОМЕР ПОРОДЫ:
		${breedsInDb.map((breed, i) => `${i + 1}. ${breed.name}`).join('\n')}\n\n
		P.S. Если подходящей породы не оказалось, отправь номер той породы, которая ближе всего подходит.`

		requestText = `${requestText}\n\n${end}`

		return {
			systemText,
			requestText,
		}
	}

	private async detectedProcedureByUserData({
		userDescription,
		imageUrl,
		detectedBreed,
	}: RequestBody & { detectedBreed: { id: string; name: string } }) {
		const proceduresInDb = await this.procedureService.findByBreed(
			detectedBreed.id
		)
		if (proceduresInDb.length <= 3) {
			return proceduresInDb.map(procedure => procedure.id)
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
		})
		if (!response) {
			return []
		}

		const detectedProcedureIndexes = response
			.split(' ')
			.map(index => Number(index) - 1)
			.filter(index => index > 0 && index <= proceduresInDb.length)
		if (!detectedProcedureIndexes.length) {
			return []
		}

		const detectedProcedures = proceduresInDb.filter((_, i) =>
			detectedProcedureIndexes.includes(i)
		)

		return detectedProcedures.map(procedure => procedure.id)
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
		${proceduresInDb.map((procedure, i) => `${i + 1}. ${procedure.name}`).join('\n')}`

		requestText = `${requestText}\n\n${end}`

		return {
			systemText,
			requestText,
		}
	}
}
