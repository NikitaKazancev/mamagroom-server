import { IsString } from 'class-validator'

export class VacancyDto {
	@IsString()
	name: string

	@IsString()
	description: string
}
