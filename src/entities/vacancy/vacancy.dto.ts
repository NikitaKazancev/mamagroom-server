import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'

export class VacancyDto {
	@IsIn(LANGUAGES_LIST)
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@ApiProperty({ example: 'Стажер' })
	name: string

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Нужно помогать грумеру, мыть собак' })
	description?: string

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}
