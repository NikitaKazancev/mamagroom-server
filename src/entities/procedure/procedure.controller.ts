import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProcedureDto } from './dto/procedure.dto'
import { ProcedureService } from './procedure.service'

@Controller('procedure')
export class ProcedureController {
	constructor(private readonly procedureService: ProcedureService) {}

	@Get()
	findAll() {
		return this.procedureService.findAll()
	}

	@Post()
	create(@Body() procedure: ProcedureDto) {
		return this.procedureService.create(procedure)
	}
}
