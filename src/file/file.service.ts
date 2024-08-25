import { Injectable } from '@nestjs/common'
import { readdirSync } from 'fs'
import { FILE_PATHS } from './utils/file.constants'

@Injectable()
export class FileService {
	findSliderAboutUsDestinations() {
		const fileNames = readdirSync(`./static/${FILE_PATHS.sliderAboutUs}`)

		return fileNames.map(
			fileName => `/static/${FILE_PATHS.sliderAboutUs}/${fileName}`
		)
	}

	findValuesDestinations() {
		const fileNames = readdirSync(`./static/${FILE_PATHS.values}`)

		return fileNames.map(
			fileName => `/static/${FILE_PATHS.values}/${fileName}`
		)
	}
}
