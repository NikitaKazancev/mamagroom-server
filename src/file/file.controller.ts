import { CacheInterceptor } from '@nestjs/cache-manager'
import {
	Controller,
	Get,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './file.service'
import {
	FILE_NAMES,
	FILE_PATHS,
	type FileName,
	type FilePath,
} from './utils/file.constants'
import { SaveFile } from './utils/file.interceptors'

@Controller('files')
@UseInterceptors(CacheInterceptor)
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get()
	async findOne(@Query('path') path: FilePath, @Query('name') name: FileName) {
		const fileUrl = await this.fileService.findOne(path, name)
		return { fileUrl }
	}

	@Post(`${FILE_PATHS.mainPage}/${FILE_NAMES.mainBg}`)
	@Auth(Role.filePostPut)
	@UseInterceptors(
		SaveFile({ path: FILE_PATHS.mainPage, name: FILE_NAMES.mainBg })
	)
	saveHomePageMainBg(@UploadedFile() file: Express.Multer.File) {}

	@Post(`${FILE_PATHS.vacanciesPage}/${FILE_NAMES.mainBg}`)
	@Auth(Role.filePostPut)
	@UseInterceptors(
		SaveFile({ path: FILE_PATHS.vacanciesPage, name: FILE_NAMES.mainBg })
	)
	saveVacanciesPageMainBg(@UploadedFile() file: Express.Multer.File) {}

	@Post(`${FILE_PATHS.mastersPage}/${FILE_NAMES.mainBg}`)
	@Auth(Role.filePostPut)
	@UseInterceptors(
		SaveFile({ path: FILE_PATHS.mastersPage, name: FILE_NAMES.mainBg })
	)
	saveMastersPageMainBg(@UploadedFile() file: Express.Multer.File) {}
}
