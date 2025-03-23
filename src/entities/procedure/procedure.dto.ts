import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator'
import { LANGUAGES_LIST, type Language } from 'src/utils/constants'

export class ProcedureDto {
	@IsIn(LANGUAGES_LIST)
	@ApiProperty({ example: 'ru' })
	language: Language

	@IsString()
	@ApiProperty({ example: 'Полная стрижка' })
	name: string

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'Может занять несколько часов' })
	description?: string

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}
