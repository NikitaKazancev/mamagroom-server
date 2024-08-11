import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('constants')
export class ConstantsController {
	constructor(private readonly constantsService: ConstantsService) {}

	@Get()
	findAll() {
		return this.constantsService.findAll()
	}

	@Post()
	create(@Body() constants: ConstantsDto) {
		return this.constantsService.create(constants)
	}
}
