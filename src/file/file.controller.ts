import {
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { FileService } from './file.service'

const sanitizeFilename = (filename: string): string => {
	return filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase()
}

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get('slider-about-us')
	findDestinationsSliderAboutUs() {
		return this.fileService.findDestinationsSliderAboutUs()
	}

	@Post('slider-about-us')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: './static/slider-about-us', // Save to the static folder
				filename: (req, file, cb) => {
					const name = sanitizeFilename(file.originalname)
					cb(null, name)
				},
			}),
		})
	)
	saveFileSliderAboutUs(@UploadedFile() file: Express.Multer.File) {
		return { destination: file.destination }
	}
}
