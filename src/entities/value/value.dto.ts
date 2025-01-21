import { Type } from 'class-transformer'
import {
	IsIn,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator'
import { type Language, LANGUAGES_LIST } from 'src/utils/constants'
import { type RequiredFields } from 'src/utils/types'

export class ValueDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
	@IsPositive()
	@IsOptional()
	@Type(() => Number)
	order?: number

	@IsOptional()
	isDeleted?: boolean
}

export type RequiredValueDto = RequiredFields<ValueDto, 'order' | 'imageName'>
