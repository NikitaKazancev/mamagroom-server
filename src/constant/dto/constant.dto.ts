import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class ConstantDto {
	@IsString()
	name: string

	@IsOptional()
	@IsBoolean()
	isUsed?: boolean

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
