import { IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'

export class MasterDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsString()
	@IsOptional()
	description?: string

	@IsString()
	@IsOptional()
	imageName?: string

	@IsString()
	@IsOptional()
	position?: string

	@IsOptional()
	isDeleted?: boolean
}
