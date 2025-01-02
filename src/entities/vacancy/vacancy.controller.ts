import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { validateLanguage } from 'src/utils/validation'
import { VacancyDto } from './vacancy.dto'
import { VacancyService } from './vacany.service'

@Controller('vacancies')
export class VacancyController {
	constructor(private readonly service: VacancyService) {}

	@Get()
	async findMany(
		@Query() language: Language,
		@Query() isUsed: boolean,
		@Query() isDeleted: boolean
	) {
		validateLanguage(language)
		return await this.service.findMany({ language, isUsed, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	async create(@Body() data: VacancyDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	async change(@Param('id') id: string, @Body() data: VacancyDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
