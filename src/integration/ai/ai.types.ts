export type OpenAIModel = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-3.5-turbo'
export type SberAIModel = 'GigaChat' | 'GigaChat-Pro' | 'GigaChat-Max'
export type YandexAIModel =
	| 'yandexgpt-lite'
	| 'yandexgpt'
	| 'yandexgpt-32k'
	| 'llama-lite'
	| 'llama'

export type AIModel = OpenAIModel | YandexAIModel | SberAIModel
export type AIServiceType = 'openai' | 'yandex' | 'sber'

export interface IServiceAI {
	models: AIModel[]
	isCorrectAIModel(model: string): model is AIModel
	request(data: AIRequestBody<AIModel>): Promise<AIResponse>
}

export type AIResponse = {
	data?: string
	model: AIModel
}

export type AIRequestBody<ModelType extends AIModel> = {
	systemText: string
	text: string
	imageUrl?: string
	model?: ModelType
}
