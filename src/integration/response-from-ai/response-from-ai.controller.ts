import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ResponseFromAIDto } from './response-from-ai.dto'
import { ResponseFromAIService } from './response-from-ai.service'

@Controller('responses-from-ai')
export class ResponseFromAIController {
	constructor(private readonly service: ResponseFromAIService) {}

	@Get()
	async findMany() {
		return await this.service.findMany()
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.responseFromAIPost)
	async create(@Body() data: ResponseFromAIDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.responseFromAIPut)
	async change(@Param('id') id: string, @Body() data: ResponseFromAIDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.responseFromAIDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
