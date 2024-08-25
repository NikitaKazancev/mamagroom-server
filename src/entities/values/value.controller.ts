import {
	Body,
	Controller,
	Get,
	Param,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { SaveFile } from 'src/file/utils/file.interceptors'
import { Language } from 'src/utils/constants'
import { ValueDto } from './dto/value.dto'
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

	@Put(':id')
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.values }))
	update(
		@Param('id') id: string,
		@Body() dto: ValueDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return this.service.change(id, dto, file)
	}
}
