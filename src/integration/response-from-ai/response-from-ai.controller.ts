import { Controller, Delete, Get, Param } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ResponseFromAIService } from './response-from-ai.service'

@Controller('responses-from-ai')
export class ResponseFromAIController {
	constructor(private readonly service: ResponseFromAIService) {}

	@Get()
	@Auth(Role.responseFromAIGet)
	async findMany() {
		return await this.service.findMany()
	}

	@Get(':id')
	@Auth(Role.responseFromAIGet)
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Delete(':id')
	@Auth(Role.responseFromAIDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
