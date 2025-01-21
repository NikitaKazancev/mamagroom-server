import { BreedType } from '@prisma/client'
import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator'
import { type Language, LANGUAGES_LIST } from 'src/utils/constants'

export class BreedDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsEnum(BreedType)
	type: BreedType

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
