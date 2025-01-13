import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Post,
	Put,
	Query,
} from '@nestjs/common'
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
		private readonly kafkaProducerService: KafkaProducerService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
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
		await this.cacheManager.reset()
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
