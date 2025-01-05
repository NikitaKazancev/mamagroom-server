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
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { SaveFile } from 'src/file/utils/file.interceptors'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { Language } from 'src/utils/constants'
import { ValueDto } from './value.dto'
import { ValueService } from './value.service'

@Controller('values')
export class ValueController {
	constructor(private readonly service: ValueService) {}

	@Get()
	async findMany(
		@Query('language') language?: Language,
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.valuePost)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.values }))
	async create(
		@Body() data: ValueDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		this.castDataPropsTypes(data)
		return await this.service.create(data, file)
	}

	@Put(':id')
	@Auth(Role.valuePut)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.values }))
	async change(
		@Param('id') id: string,
		@Body() data: ValueDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		this.castDataPropsTypes(data)
		return await this.service.change(id, data, file)
	}

	@Delete(':id')
	@Auth(Role.valueDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}

	private castDataPropsTypes(data: ValueDto) {
		data.order = Number(data.order)
		data.isDeleted = Boolean(data.isDeleted)
	}
}
