import { Controller, Delete, Get, Param, Query } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ResponseFromAIService } from './response-from-ai.service'
import { OptionalParseNumberPipe } from 'src/pipes/oprional-parse-number.pipe'

@Controller('responses-from-ai')
export class ResponseFromAIController {
	constructor(private readonly service: ResponseFromAIService) {}

	@Get()
	@Auth(Role.responseFromAIGet)
	async findMany(@Query('amount', OptionalParseNumberPipe) amount?: number) {
		return await this.service.findMany({ amount })
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
