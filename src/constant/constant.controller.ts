import { Controller, Get } from '@nestjs/common'
import { ConstantService } from './constant.service'

@Controller('constants')
export class ConstantController {
	constructor(private readonly constantService: ConstantService) {}

	@Get()
	findAll() {
		return this.constantService.findAll()
	}
}
