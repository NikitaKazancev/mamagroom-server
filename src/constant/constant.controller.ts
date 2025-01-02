import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'
import { ConstantService } from './constant.service'

@Controller('constants')
export class ConstantController {
	constructor(private readonly service: ConstantService) {}

	@Get()
	async findMany(@Query() filter: ConstantDimensionsDto) {
		return await this.service.findMany(filter)
	}

	@Post()
	async create(@Body() data: ConstantDto) {
		return await this.service.create(data)
	}

	@Put()
	async change(@Body() data: ConstantDto) {
		return await this.service.change(data)
	}

	@Delete()
	async delete(@Query() filter: ConstantDimensionsDto) {
		return await this.service.delete(filter)
	}
}
