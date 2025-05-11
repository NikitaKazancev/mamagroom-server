import { CacheInterceptor } from '@nestjs/cache-manager'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { OptionalParseNumberPipe } from 'src/pipes/oprional-parse-number.pipe'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { getMemStart, logUsedMemory } from 'src/utils/functions'
import { PriceDto } from './price.dto'
import { PriceService } from './price.service'

@Controller('prices')
@UseInterceptors(CacheInterceptor)
export class PriceController {
	constructor(private readonly service: PriceService) {}

	@Get()
	async findMany(
		@Query('breedId') breedId?: string,
		@Query('procedureId') procedureId?: string,
		@Query('weight', OptionalParseNumberPipe) weight?: number,
		@Query('time', OptionalParseNumberPipe) time?: number,
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		return await this.service.findMany({
			breedId,
			procedureId,
			weight,
			time,
			isDeleted,
		})
	}

	@Post()
	@Auth(Role.pricePost)
	async create(@Body() data: PriceDto) {
		const memStart = getMemStart()
		const response = await this.service.create(data)
		logUsedMemory(memStart, 'create prices')
		return response
	}

	@Put(':id')
	@Auth(Role.pricePut)
	async change(@Param('id') id: string, @Body() data: PriceDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.priceDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
