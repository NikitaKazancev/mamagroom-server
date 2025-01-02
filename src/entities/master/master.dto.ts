import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class MasterDto {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	@IsOptional()
	imageName: string

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
