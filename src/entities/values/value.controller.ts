import { Controller, Get, Query } from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { ValueService } from './value.service'

@Controller('values')
export class ValueController {
	constructor(private readonly service: ValueService) {}

	@Get()
	findMany(
		@Query('language') language: Language,
		@Query('isUsed') isUsed: boolean
	) {
		return this.service.findMany({ language, isUsed })
	}
}
