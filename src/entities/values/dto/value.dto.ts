import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ValueDto {
	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	link?: string

	@IsString()
	@IsOptional()
	parentLinkId?: string

	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
	@IsOptional()
	order?: number
}
