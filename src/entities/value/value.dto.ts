import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'
import { Language, LANGUAGES_LIST } from 'src/utils/constants'
import { RequiredFields } from 'src/utils/types'

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
	@IsOptional()
	@Type(() => Number)
	order?: number

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	isDeleted?: boolean
}

export type RequiredValueDto = RequiredFields<ValueDto, 'order' | 'imageName'>
