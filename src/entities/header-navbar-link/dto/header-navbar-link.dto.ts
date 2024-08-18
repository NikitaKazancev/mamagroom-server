import { IsNumber, IsOptional, IsString } from 'class-validator'

export class HeaderNavbarLinkDto {
	@IsString()
	name: string

	@IsString()
	@IsOptional()
	link?: string

	@IsString()
	@IsOptional()
	parentLinkId?: string

	@IsNumber()
	order: number
}
