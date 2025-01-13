import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { KafkaProducerService } from 'src/kafka/kafka.producer'
import { Language } from 'src/utils/constants'
import { ConstantDto } from './constant.dto'
import { ConstantService } from './constant.service'

@Controller('constants')
export class ConstantController {
	constructor(
		private readonly service: ConstantService,
		private readonly kafkaProducerService: KafkaProducerService
	) {}

	@Get()
	async findMany(
		@Query('language') language?: Language,
		@Query('type') type?: string,
		@Query('name') name?: string
	) {
		return await this.service.findMany({ language, type, name })
	}

	@Post()
	@Auth(Role.constantPost)
	async create(@Body() data: ConstantDto) {
		return await this.service.create(data)
	}

	@Put()
	@Auth(Role.constantPut)
	async change(@Body() data: ConstantDto) {
		this.kafkaProducerService.resetCache()
		return await this.service.change(data)
	}

	@Delete()
	@Auth(Role.constantDelete)
	async delete(
		@Query('language') language?: Language,
		@Query('type') type?: string,
		@Query('name') name?: string
	) {
		return await this.service.delete({ language, type, name })
	}
}
