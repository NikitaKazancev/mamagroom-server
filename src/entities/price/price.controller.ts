import {
	Body,
	Controller,
	Delete,
	Get,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseInterceptors,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { OptionalParseNumberPipe } from 'src/pipes/oprional-parse-number.pipe'
import { PriceDto } from './price.dto'
import { PriceService } from './price.service'
import { CacheInterceptor } from '@nestjs/cache-manager'

@Controller('prices')
@UseInterceptors(CacheInterceptor)
export class PriceController {
	constructor(private readonly service: PriceService) {}

	@Get()
	async findMany(
		@Query('breedId') breedId?: string,
		@Query('procedureId') procedureId?: string,
		@Query('weight', OptionalParseNumberPipe) weight?: number,
		@Query('time', OptionalParseNumberPipe) time?: number
	) {
		return await this.service.findMany({ breedId, procedureId, weight, time })
	}

	@Post()
	@Auth(Role.pricePost)
	async create(@Body() data: PriceDto) {
		return await this.service.create(data)
	}

	@Put()
	@Auth(Role.pricePut)
	async change(@Body() data: PriceDto) {
		return await this.service.change(data)
	}

	@Delete()
	@Auth(Role.priceDelete)
	async delete(
		@Query('breedId') breedId: string,
		@Query('procedureId') procedureId: string,
		@Query('weight', ParseIntPipe) weight: number,
		@Query('time', ParseIntPipe) time: number
	) {
		return await this.service.delete({ breedId, procedureId, weight, time })
	}
}
