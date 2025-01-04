import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { PriceDimensionsDto, PriceDto } from './price.dto'
import { PriceService } from './price.service'

@Controller('prices')
export class PriceController {
	constructor(private readonly service: PriceService) {}

	@Get()
	async findMany(@Query() filter: Partial<PriceDimensionsDto>) {
		return await this.service.findMany(filter)
	}

	@Post()
	async create(@Body() data: PriceDto) {
		return await this.service.create(data)
	}

	@Put()
	async change(@Body() data: PriceDto) {
		return await this.service.change(data)
	}

	@Delete()
	async delete(@Query() filter: PriceDimensionsDto) {
		return await this.service.delete(filter)
	}
}
