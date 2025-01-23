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
import { SaveFile } from 'src/file/utils/file.interceptors'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { toBoolean } from 'src/utils/functions'
import { MainSliderDto } from './main-slider.dto'
import { MainSliderService } from './main-slider.service'
import { CacheInterceptor } from '@nestjs/cache-manager'

@Controller('main-slider')
@UseInterceptors(CacheInterceptor)
export class MainSliderController {
	constructor(private readonly service: MainSliderService) {}

	@Get()
	async findMany(
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		return await this.service.findMany({ isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.mainSliderPost)
	@UseInterceptors(SaveFile({ path: 'main-slider' }))
	async create(
		@Body() data: MainSliderDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		this.castDataPropsTypes(data)
		return await this.service.create(data, file)
	}

	@Put(':id')
	@Auth(Role.mainSliderPut)
	@UseInterceptors(SaveFile({ path: 'main-slider' }))
	async change(
		@Param('id') id: string,
		@Body() data: MainSliderDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		this.castDataPropsTypes(data)
		return await this.service.change(id, data, file)
	}

	@Delete(':id')
	@Auth(Role.mainSliderDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}

	private castDataPropsTypes(data: MainSliderDto) {
		data.order = Number(data.order)
		data.isDeleted = toBoolean(data.isDeleted)
	}
}
