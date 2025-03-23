import { ApiProperty } from '@nestjs/swagger'
import { BreedType } from '@prisma/client'
import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator'
import { type Language, LANGUAGES_LIST } from 'src/utils/constants'

export class BreedDto {
	@IsIn(LANGUAGES_LIST)
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@ApiProperty({ example: 'Алабай' })
	name: string

	@IsEnum(BreedType)
	@ApiProperty({ example: 'smallDog' })
	type: BreedType

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}
