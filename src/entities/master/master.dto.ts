import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'

export class MasterDto {
	@IsIn(LANGUAGES_LIST)
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@ApiProperty({ example: 'Иван' })
	name: string

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'крутой мастер' })
	description?: string

	@IsString()
	@IsOptional()
	imageName?: string

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'стажер' })
	position?: string

	@IsOptional()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}
