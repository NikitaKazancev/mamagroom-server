import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'
import { LANGUAGES_LIST, Language } from 'src/utils/constants'

export class HeaderNavbarLinkDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	name: string

	@IsNumber()
	@IsOptional()
	order: number

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
