import { IsIn, IsString } from 'class-validator'
import { Language, LANGUAGES_LIST } from 'src/utils/constants'
import {
	CONSTANT_NAMES_LIST,
	CONSTANT_TYPES_LIST,
} from '../utils/constant.types'

export class ConstantDto {
	@IsString()
	@IsIn(LANGUAGES_LIST)
	language: Language

	@IsString()
	@IsIn(CONSTANT_TYPES_LIST)
	type: string

	@IsString()
	@IsIn(CONSTANT_NAMES_LIST)
	name: string

	@IsString()
	value: string
}
