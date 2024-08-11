import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProceduresDto } from './dto/procedures.dto'
import { ProceduresService } from './procedures.service'

@Controller('procedures')
export class ProceduresController {
	constructor(private readonly proceduresService: ProceduresService) {}

	@Get()
	findAll() {
		return this.proceduresService.findAll()
	}

	@Post()
	create(@Body() procedures: ProceduresDto) {
		return this.proceduresService.create(procedures)
	}
}
