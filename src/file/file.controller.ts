import {
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { FILE_PATHS } from './utils/file.constants'
import { SaveFileByName } from './utils/save-file-by-name.interceptor'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('pages/home/main-bg')
	@UseInterceptors(SaveFileByName({ name: 'main-bg', folder: 'pages/home' }))
	saveHomePageMainBg(@UploadedFile() file: Express.Multer.File) {
		return { destination: file.destination }
	}

	@Get(FILE_PATHS.sliderAboutUs)
	findSliderAboutUsDestinations() {
		return this.fileService.findSliderAboutUsDestinations()
	}

	@Post(FILE_PATHS.sliderAboutUs)
	@UseInterceptors(SaveFileByName({ folder: FILE_PATHS.sliderAboutUs }))
	saveSliderAboutUsFile(@UploadedFile() file: Express.Multer.File) {
		return { destination: file.destination }
	}
}
