import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ClearCache } from 'src/decorators/clear-cache.decorator'
import { Language } from 'src/utils/constants'
import { ConstantDto } from './constant.dto'
import { ConstantService } from './constant.service'

@Controller('constants')
export class ConstantController {
	constructor(private readonly service: ConstantService) {}

	@Get()
	async findMany(
		@Query('language') language?: Language,
		@Query('type') type?: string,
		@Query('name') name?: string
	) {
		return await this.service.findMany({ language, type, name })
	}

	@Post()
	@Auth(Role.constantPost)
	@ClearCache()
	async create(@Body() data: ConstantDto) {
		return await this.service.create(data)
	}

	@Put()
	@Auth(Role.constantPut)
	@ClearCache()
	async change(@Body() data: ConstantDto) {
		const res = await this.service.change(data)
		console.log('Changed constant: ', res)
		return res
	}

	@Delete()
	@Auth(Role.constantDelete)
	@ClearCache()
	async delete(
		@Query('language') language?: Language,
		@Query('type') type?: string,
		@Query('name') name?: string
	) {
		return await this.service.delete({ language, type, name })
	}
}
