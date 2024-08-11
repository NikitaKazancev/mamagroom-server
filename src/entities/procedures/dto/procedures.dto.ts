import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProceduresDto {
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsNumber()
	order?: number

	@IsOptional()
	@IsBoolean()
	isUsed?: boolean

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
