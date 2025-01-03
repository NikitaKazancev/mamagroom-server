import { Injectable } from '@nestjs/common'
import { OpenAIModel, OpenAIService } from './openai.service'
import { SberAIModel, SberService } from './sber.service'
import { YandexAIModel, YandexService } from './yandex.service'

type AIModel = OpenAIModel | YandexAIModel | SberAIModel

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
	}): Promise<string | undefined> {
		if (model) {
			this.currentModel = model
		} else {
			this.currentModel = this.nextModel()
		}

		if (imageUrl) {
			this.setModelToWorkWithImages()
		}

		if (this.openAIService.isOpenAIModel(this.currentModel)) {
			return await this.openAIService.request({
				systemText,
				text,
				imageUrl,
				model: this.currentModel,
			})
		}

		if (this.yandexService.isYandexAIModel(this.currentModel)) {
			return await this.yandexService.request({
				systemText,
				text,
				model: this.currentModel,
			})
		}

		if (this.sberService.isSberAIModel(this.currentModel)) {
			return await this.sberService.request({
				systemText,
				text,
				imageUrl,
				model: this.currentModel,
			})
		}
	}

	private nextModel() {
		const indexOfCurrentModel = this.models.indexOf(this.currentModel)
		return indexOfCurrentModel >= this.models.length - 1
			? this.models[0]
			: this.models[indexOfCurrentModel + 1]
	}

	private setModelToWorkWithImages() {
		while (this.yandexService.isYandexAIModel(this.currentModel)) {
			this.currentModel = this.nextModel()
		}
	}
}
