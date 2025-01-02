import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class VacancyDto {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsBoolean()
	@IsOptional()
	isDeleted?: boolean
}
