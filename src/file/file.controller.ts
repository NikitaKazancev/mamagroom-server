import {
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { FILE_PATHS } from './utils/file.constants'
import { SaveFile } from './utils/file.interceptors'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('pages/home/main-bg')
	@UseInterceptors(SaveFile({ name: 'main-bg', folder: 'pages/home' }))
	saveHomePageMainBg(@UploadedFile() file: Express.Multer.File) {
		// return { destination: file.destination }
	}

	@Get(FILE_PATHS.sliderAboutUs)
	findSliderAboutUsDestinations() {
		return this.fileService.findSliderAboutUsDestinations()
	}

	@Post(FILE_PATHS.sliderAboutUs)
	@UseInterceptors(SaveFile({ folder: FILE_PATHS.sliderAboutUs }))
	saveSliderAboutUsFile(@UploadedFile() file: Express.Multer.File) {
		// return { destination: file.destination }
	}

	// @Get(FILE_PATHS.values)
	// findValuesDestinations() {
	// 	return this.fileService.findValuesDestinations()
	// }

	// @Post(FILE_PATHS.values)
	// @UseInterceptors(SaveFile({ byId: true, folder: FILE_PATHS.values }))
	// saveValuesFile(
	// 	@Query('id') id: string,
	// 	@UploadedFile() file: Express.Multer.File
	// ) {
	// return { destination: file.destination }
	// }
}
