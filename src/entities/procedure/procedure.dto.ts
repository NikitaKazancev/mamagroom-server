import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'

export class ProcedureDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
