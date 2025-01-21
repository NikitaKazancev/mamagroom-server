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
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { type Language } from 'src/utils/constants'
import { VacancyDto } from './vacancy.dto'
import { VacancyService } from './vacancy.service'

@Controller('vacancies')
export class VacancyController {
	constructor(private readonly service: VacancyService) {}

	@Get()
	async findMany(
		@Query('language') language?: Language,
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.vacancyPost)
	async create(@Body() data: VacancyDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.vacancyPut)
	async change(@Param('id') id: string, @Body() data: VacancyDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.vacancyDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
