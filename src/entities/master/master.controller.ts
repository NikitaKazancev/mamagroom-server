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
import { Language } from 'src/utils/constants'
import { MasterDto } from './master.dto'
import { MasterService } from './master.service'

@Controller('masters')
export class MasterController {
	constructor(private readonly service: MasterService) {}

	@Get()
	async findMany(@Query() language?: Language, @Query() isDeleted?: boolean) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.masterPost)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.masters }))
	async create(
		@Body() data: MasterDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		return await this.service.create(data, file)
	}

	@Put(':id')
	@Auth(Role.masterPut)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.masters }))
	async change(
		@Param('id') id: string,
		@Body() data: MasterDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		return await this.service.change(id, data, file)
	}

	@Delete(':id')
	@Auth(Role.masterDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
