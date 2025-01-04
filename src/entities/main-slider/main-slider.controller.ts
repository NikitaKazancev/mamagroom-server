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
import { MainSliderDto } from './main-slider.dto'
import { MainSliderService } from './main-slider.service'

@Controller('main-slider')
export class MainSliderController {
	constructor(private readonly service: MainSliderService) {}

	@Get()
	async findMany(@Query() isDeleted?: boolean) {
		return await this.service.findMany({ isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.mainSliderPost)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.mainSlider }))
	async create(
		@Body() data: MainSliderDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		return await this.service.create(data, file)
	}

	@Put(':id')
	@Auth(Role.mainSliderPut)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.mainSlider }))
	async change(
		@Param('id') id: string,
		@Body() data: MainSliderDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		return await this.service.change(id, data, file)
	}

	@Delete(':id')
	@Auth(Role.mainSliderDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
