import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsString } from 'class-validator'
import { type Language, LANGUAGES_LIST } from 'src/utils/constants'
import {
	CONSTANT_NAMES_LIST,
	CONSTANT_TYPES_LIST,
} from './utils/constant.types'

export class ConstantDto {
	@IsString()
	@IsIn(LANGUAGES_LIST)
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@IsIn(CONSTANT_TYPES_LIST)
	@ApiProperty({ example: 'home-page' })
	type: string

	@IsString()
	@IsIn(CONSTANT_NAMES_LIST)
	@ApiProperty({ example: 'main-title' })
	name: string

	@IsString()
	@ApiProperty({ example: 'Значение константы' })
	value: string
}

export class ConstantDimensionsDto {
	@IsString()
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	@IsIn(CONSTANT_TYPES_LIST)
	type: string

	@IsString()
	@IsIn(CONSTANT_NAMES_LIST)
	name: string
}
