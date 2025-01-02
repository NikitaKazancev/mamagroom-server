import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'
import { LANGUAGES_LIST, Language } from 'src/utils/constants'

export class ValueDto {
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	@IsOptional()
	imageName: string

	@IsNumber()
	@IsOptional()
	order: number

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
