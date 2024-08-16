import { readdirSync } from 'fs'

export class FileService {
	findDestinationsSliderAboutUs() {
		const fileNames = readdirSync('./static/slider-about-us')

		return fileNames.map(fileName => `/static/slider-about-us/${fileName}`)
	}
}
