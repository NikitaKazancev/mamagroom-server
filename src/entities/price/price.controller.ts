import { Body, Controller, Get, Post } from '@nestjs/common'
import { PriceDto } from './dto/price.dto'
import { PriceService } from './price.service'

@Controller('prices')
export class PriceController {
	constructor(private readonly priceService: PriceService) {}

	@Get()
	findAll() {
		return this.priceService.findAll()
	}

	@Post()
	create(@Body() price: PriceDto) {
		return this.priceService.create(price)
	}
}
