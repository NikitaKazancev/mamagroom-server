import { ApiProperty } from '@nestjs/swagger'
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
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@ApiProperty({ example: 'Ответственность' })
	title: string

	@IsString()
	@ApiProperty({ example: 'Ответственно относимся к самым разным пёсикам' })
	description: string

	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
	@IsPositive()
	@IsOptional()
	@ApiProperty({ example: 1 })
	@Type(() => Number)
	order?: number

	@IsOptional()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}

export type RequiredValueDto = RequiredFields<ValueDto, 'order' | 'imageName'>
