import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FILE_PATHS } from './utils/file.constants'
import { SaveFile } from './utils/file.interceptors'

@Controller('files')
export class FileController {
	constructor() {}

	@Post(FILE_PATHS.mainBg)
	@Auth(Role.filePostPut)
	@UseInterceptors(SaveFile({ name: 'main-bg', folder: 'pages/home' }))
	saveHomePageMainBg(@UploadedFile() file: Express.Multer.File) {}
}
