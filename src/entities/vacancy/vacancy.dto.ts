import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, Language } from 'src/utils/constants'

export class VacancyDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsString()
	description: string

	@IsBoolean()
	@IsOptional()
	isDeleted?: boolean
}
