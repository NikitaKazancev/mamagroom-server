import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service'
import { FILE_PATHS } from './utils/file.constants'
import { SaveFile } from './utils/file.interceptors'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post(FILE_PATHS.mainBg)
	@UseInterceptors(SaveFile({ name: 'main-bg', folder: 'pages/home' }))
	saveHomePageMainBg(@UploadedFile() file: Express.Multer.File) {}
}
