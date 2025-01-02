import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ValueDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	@IsOptional()
	imageName: string

	@IsNumber()
	@IsOptional()
	order: number

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
