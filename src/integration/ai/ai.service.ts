import { Injectable } from '@nestjs/common'
import { OpenAIModel, OpenAIService } from './openai.service'

type AIModel = OpenAIModel

@Injectable()
export class AIService {
	models: AIModel[] = []
	currentModel: AIModel

	constructor(private readonly openAIService: OpenAIService) {
		this.models = [...openAIService.models]
	}

	async request({
		text,
		imageUrl,
		model,
	}: {
		text: string
		imageUrl?: string
		model?: AIModel
	}) {
		if (model) {
			this.currentModel = model
		} else {
			const indexOfCurrentModel = this.models.indexOf(this.currentModel)
			this.currentModel =
				indexOfCurrentModel >= this.models.length - 1
					? this.models[0]
					: this.models[indexOfCurrentModel + 1]
		}

		if (this.openAIService.isOpenAIModel(this.currentModel)) {
			return await this.openAIService.request({
				text,
				imageUrl,
				model: this.currentModel,
			})
		}
	}
}
