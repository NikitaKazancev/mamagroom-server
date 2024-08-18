import { IsArray, IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { Language, LANGUAGES_LIST } from 'src/utils/constants'

export class HeaderNavLinksDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsBoolean()
	isUsed?: boolean

	@IsBoolean()
	isDeleted?: boolean

	@IsArray()
	data: HeaderNavLinks[]
}

export class HeaderNavLinks {
	@IsString()
	name: string

	@IsString()
	@IsOptional()
	link?: string

	@IsArray()
	@IsOptional()
	sublinks?: HeaderNavLinks[]
}
