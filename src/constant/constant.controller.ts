import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { Language, LANGUAGES_LIST } from 'src/utils/constants'
import { badRequest } from 'src/utils/errors'
import { ConstantService } from './constant.service'
import { ConstantDto } from './dto/constant.dto'
import {
	CONSTANT_NAMES_LIST,
	CONSTANT_TYPES_LIST,
} from './utils/constant.types'

@Controller('constants')
export class ConstantController {
	constructor(private readonly constantService: ConstantService) {}

	validateQueryParams({
		language,
		type,
		name,
	}: {
		language: Language
		type: string
		name: string
	}) {
		if (language && LANGUAGES_LIST.indexOf(language) === -1)
			badRequest('Invalid language', ConstantController.name, language)

		if (type && CONSTANT_TYPES_LIST.indexOf(type) === -1)
			badRequest('Invalid constant type', ConstantController.name)

		if (name && CONSTANT_NAMES_LIST.indexOf(name) === -1)
			badRequest('Invalid constant name', ConstantController.name)
	}

	@Get()
	findMany(
		@Query('language') language: Language,
		@Query('type') type: string,
		@Query('name') name: string
	) {
		this.validateQueryParams({ language, type, name })
		return this.constantService.findMany({ language, type })
	}

	@Post()
	createOne(@Body() dto: ConstantDto) {
		return this.constantService.createOne(dto)
	}

	@Put()
	changeOne(@Body() dto: ConstantDto) {
		return this.constantService.changeOne(dto)
	}

	@Delete()
	deleteOne(
		@Query('language') language: Language,
		@Query('type') type: string,
		@Query('name') name: string
	) {
		this.validateQueryParams({ language, type, name })
		return this.constantService.deleteOne({ language, name, type })
	}
}
