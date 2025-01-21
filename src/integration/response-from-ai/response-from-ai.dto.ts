import { type AIModel } from '../ai/ai.types'

export class ResponseFromAIDto {
	model?: AIModel
	userDescription?: string
	breedId?: string
	imageName?: string
	procedureIds: string[]
}
