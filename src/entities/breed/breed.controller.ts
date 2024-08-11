import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { BreedService } from './breed.service'
import { BreedDto } from './dto/breed.dto'

@Controller('breeds')
export class BreedController {
	constructor(private readonly breedService: BreedService) {}

	@Get()
	findAll(@Query('lang') lang: string) {
		return this.breedService.findAll({ lang })
	}

	@Post()
	create(@Body() breed: BreedDto) {
		return this.breedService.create(breed)
	}
}
