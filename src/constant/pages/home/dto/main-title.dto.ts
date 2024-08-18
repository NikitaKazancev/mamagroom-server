import { IsIn, IsOptional, IsString } from 'class-validator'
import { Language, LANGUAGES_LIST } from 'src/utils/constants'

export class MainTitleDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	description?: string
}
