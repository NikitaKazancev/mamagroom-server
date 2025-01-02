import { BreedType } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class BreedDto {
	@IsString()
	name: string

	@IsEnum(BreedType)
	type: BreedType

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
