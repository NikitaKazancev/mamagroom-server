import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { SaveFile } from 'src/file/utils/file.interceptors'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { Language } from 'src/utils/constants'
import { ProcedureDto } from './procedure.dto'
import { ProcedureService } from './procedure.service'

@Controller('procedures')
export class ProcedureController {
	constructor(private readonly service: ProcedureService) {}

	@Get()
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.forAI }))
	async findMany(
		@Body() data: { description?: string },
		@UploadedFile() file?: Express.Multer.File,
		@Query('language') language?: Language,
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		if (data.description || file) {
			return await this.service.findByUserData(data.description, file)
		}
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.procedurePost)
	async create(@Body() data: ProcedureDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.procedurePut)
	async change(@Param('id') id: string, @Body() data: ProcedureDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.procedureDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
