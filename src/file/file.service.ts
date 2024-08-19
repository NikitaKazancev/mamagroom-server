import { readdirSync } from 'fs'
import { FILE_PATHS } from './utils/file.constants'

export class FileService {
	findSliderAboutUsDestinations() {
		const fileNames = readdirSync(`./static/${FILE_PATHS.sliderAboutUs}`)

		return fileNames.map(
			fileName => `/static/${FILE_PATHS.sliderAboutUs}/${fileName}`
		)
	}
}
