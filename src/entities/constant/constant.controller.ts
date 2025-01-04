import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'
import { ConstantService } from './constant.service'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('constants')
export class ConstantController {
	constructor(private readonly service: ConstantService) {}

	@Get()
	async findMany(@Query() filter: ConstantDimensionsDto) {
		return await this.service.findMany(filter)
	}

	@Post()
	@Auth(Role.constantPost)
	async create(@Body() data: ConstantDto) {
		return await this.service.create(data)
	}

	@Put()
	@Auth(Role.constantPut)
	async change(@Body() data: ConstantDto) {
		return await this.service.change(data)
	}

	@Delete()
	@Auth(Role.constantDelete)
	async delete(@Query() filter: ConstantDimensionsDto) {
		return await this.service.delete(filter)
	}
}
