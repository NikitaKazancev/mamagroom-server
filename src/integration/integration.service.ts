/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { BreedService } from 'src/entities/breed/breed.service'
import { ProcedureService } from 'src/entities/procedure/procedure.service'
import { AIService } from './ai/ai.service'
import { ResponseFromAIService } from './response-from-ai/response-from-ai.service'

@Injectable()
export class IntegrationService {
	constructor(
		private readonly breedService: BreedService,
		private readonly procedureService: ProcedureService,
		private readonly responseFromAIService: ResponseFromAIService,
		private readonly aiService: AIService
	) {}

	async procedureIdsByUserDescription(userDescription: string) {
		if (!userDescription) {
			return []
		}

		const dataInDb = await this.responseFromAIService.findMany({
			userDescription,
		})
		if (dataInDb.length) {
			return dataInDb[0].procedures.map(procedure => procedure.id)
		}

		const detectedBreed =
			await this.detectedBreedByUserDescription(userDescription)

		if (!detectedBreed) {
			await this.responseFromAIService.create({
				breedId: detectedBreed.id,
				userDescription,
				procedureIds: [],
			})

			return []
		}

		const procedureIds = await this.detectedProcedureByUserDescription(
			userDescription,
			detectedBreed
		)

		await this.responseFromAIService.create({
			breedId: detectedBreed.id,
			userDescription,
			procedureIds,
		})

		return procedureIds
	}

	private async detectedBreedByUserDescription(userDescription: string) {
		const breedsInDb: { name: string; id: string }[] =
			await this.breedService.findMany(
				{ isDeleted: false, language: 'ru' },
				{ name: true, id: true }
			)

		const requestText = `
		Ты эксперт в области кинологии и собаководства.
		Прочти описание пользователя и выдели из него породу собаки:

		"""${userDescription}"""


		В качестве ответа отправь ТОЛЬКО НОМЕР ПОРОДЫ:
		${breedsInDb.map((breed, i) => `${i + 1}. ${breed.name}`).join('\n')}


		P.S. Если подходящей породы не оказалось, отправь номер той породы, которая ближе всего подходит по описанию пользователя.
		`

		const response = await this.aiService.request({ text: requestText })
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

	private async detectedProcedureByUserDescription(
		userDescription: string,
		detectedBreed: { id: string; name: string }
	) {
		const proceduresInDb = await this.procedureService.findByBreed(
			detectedBreed.id
		)
		if (proceduresInDb.length <= 3) {
			return proceduresInDb.map(procedure => procedure.id)
		}

		const requestText = `
		Ты эксперт в области кинологии и собаководства.
		Прочти описание пользователя и предложи 2-3 подходящие услуги для породы ${detectedBreed.name}:

		"""${userDescription}"""


		В качестве ответа отправь ТОЛЬКО НОМЕРА УСЛУГ ЧЕРЕЗ ПРОБЕЛ:
		${proceduresInDb.map((procedure, i) => `${i + 1}. ${procedure.name}`).join('\n')}
		`

		const response = await this.aiService.request({ text: requestText })
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
}
