import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
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
	async create(@Body() data: ResponseFromAIDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	async change(@Param('id') id: string, @Body() data: ResponseFromAIDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
