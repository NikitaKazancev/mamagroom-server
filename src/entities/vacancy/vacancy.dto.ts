import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'

export class VacancyDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsString()
	@IsOptional()
	description?: string

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
