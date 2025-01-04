export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-3.5-turbo'
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
}
