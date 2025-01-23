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
	EXTERNAL_PATHS,
	type FileName,
	type FilePath,
} from './utils/file.constants'
import { SaveFile } from './utils/file.interceptors'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get()
	async findOne(@Query('path') path: FilePath, @Query('name') name: FileName) {
		const fileUrl = await this.fileService.findOne(path, name)
		return { fileUrl }
	}

	@Post(EXTERNAL_PATHS.mainBg)
	@Auth(Role.filePostPut)
	@UseInterceptors(SaveFile({ name: 'main-bg', path: 'pages/home' }))
	saveHomePageMainBg(@UploadedFile() file: Express.Multer.File) {}
}
