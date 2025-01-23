import { Injectable } from '@nestjs/common'
import { type AIModel, type AIResponse, type IServiceAI } from './ai.types'
import { OpenAIService } from './openai.service'
import { SberService } from './sber.service'
import { YandexService } from './yandex.service'

@Injectable()
export class AIService {
	models: AIModel[] = []
	currentModel: AIModel

	constructor(
		private readonly openAIService: OpenAIService,
		private readonly yandexService: YandexService,
		private readonly sberService: SberService
	) {
		this.models = [
			...openAIService.models,
			...yandexService.models,
			...sberService.models,
		]
	}

	async request({
		text,
		systemText,
		imageUrl,
		model,
	}: {
		text: string
		systemText: string
		imageUrl?: string
		model?: AIModel
	}): Promise<AIResponse> {
		if (model) {
			this.currentModel = model
		} else {
			this.currentModel = this.nextModel()
		}

		let res: AIResponse

		if (imageUrl) {
			this.setModelToWorkWithImages()
		}

		if (this.openAIService.isCorrectAIModel(this.currentModel)) {
			res = await this.openAIService.request({
				systemText,
				text,
				imageUrl,
				model: this.currentModel,
			})
		}

		if (this.yandexService.isCorrectAIModel(this.currentModel)) {
			res = await this.yandexService.request({
				systemText,
				text,
				model: this.currentModel,
			})
		}

		if (this.sberService.isCorrectAIModel(this.currentModel)) {
			res = await this.sberService.request({
				systemText,
				text,
				imageUrl,
				model: this.currentModel,
			})
		}

		return res
	}

	private nextModel() {
		const indexOfCurrentModel = this.models.indexOf(this.currentModel)
		return indexOfCurrentModel >= this.models.length - 1
			? this.models[0]
			: this.models[indexOfCurrentModel + 1]
	}

	private setModelToWorkWithImages() {
		while (this.yandexService.isCorrectAIModel(this.currentModel)) {
			this.currentModel = this.nextModel()
		}
	}

	private skipAIService(aiService: IServiceAI) {
		while (aiService.isCorrectAIModel(this.currentModel)) {
			this.currentModel = this.nextModel()
		}
	}

	private setAIService(aiService: IServiceAI) {
		while (!aiService.isCorrectAIModel(this.currentModel)) {
			this.currentModel = this.nextModel()
		}
	}
}
