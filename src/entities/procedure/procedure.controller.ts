import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { ProcedureDto } from './procedure.dto'
import { ProcedureService } from './procedure.service'

@Controller('procedures')
export class ProcedureController {
	constructor(private readonly service: ProcedureService) {}

	@Get()
	async findMany(@Query() language?: Language, @Query() isDeleted?: boolean) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	async create(@Body() data: ProcedureDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	async change(@Param('id') id: string, @Body() data: ProcedureDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
