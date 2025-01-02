import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class HeaderNavbarLinkDto {
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
