import { IsArray, IsString } from 'class-validator'

export class ResponseFromAIDto {
	@IsString()
	breedId: string

	@IsString()
	userDescription: string

	@IsString()
	imageName: string

	@IsArray()
	procedureIds: string[]
}
