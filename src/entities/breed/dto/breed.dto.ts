import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class BreedDto {
	@IsString()
	name: string

	@IsOptional()
	@IsBoolean()
	isUsed?: boolean

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
