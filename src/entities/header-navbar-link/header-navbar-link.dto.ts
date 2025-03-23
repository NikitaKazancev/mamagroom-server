import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'
import { type RequiredFields } from 'src/utils/types'

export class HeaderNavbarLinkDto {
	@IsIn(LANGUAGES_LIST)
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@ApiProperty({ example: 'Наши услуги' })
	name: string

	@IsNumber()
	@IsPositive()
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({ example: 1 })
	order?: number

	@IsString()
	@IsOptional()
	@ApiProperty({ example: '/services' })
	link?: string

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'abc...' })
	parentLinkId?: string

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}

export type RequiredHeaderNavbarLinkDto = RequiredFields<
	HeaderNavbarLinkDto,
	'order'
>
