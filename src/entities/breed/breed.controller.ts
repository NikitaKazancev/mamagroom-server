import { Body, Controller, Get, Post } from '@nestjs/common'
import { BreedService } from './breed.service'
import { BreedDto } from './dto/breed.dto'

@Controller('breeds')
export class BreedController {
	constructor(private readonly breedService: BreedService) {}

	@Get()
	findAll() {
		return this.breedService.findAll()
	}

	@Post()
	create(@Body() breed: BreedDto) {
		return this.breedService.create(breed)
	}
}
