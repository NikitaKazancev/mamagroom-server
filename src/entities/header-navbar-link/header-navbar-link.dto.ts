import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator'
import { LANGUAGES_LIST, Language } from 'src/utils/constants'
import { RequiredFields } from 'src/utils/types'

export class HeaderNavbarLinkDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsNumber()
	@IsPositive()
	@IsOptional()
	@Type(() => Number)
	order?: number

	@IsString()
	@IsOptional()
	link?: string

	@IsString()
	@IsOptional()
	parentLinkId?: string

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}

export type RequiredHeaderNavbarLinkDto = RequiredFields<
	HeaderNavbarLinkDto,
	'order'
>
