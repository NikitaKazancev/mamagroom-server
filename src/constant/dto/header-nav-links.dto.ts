import { IsArray, IsOptional, IsString } from 'class-validator'

export class HeaderNavLinksDto {
	@IsString()
	lang: string

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
