import { Type } from 'class-transformer'
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, Language } from 'src/utils/constants'

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

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	isDeleted?: boolean
}
