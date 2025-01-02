import { Injectable } from '@nestjs/common'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { notFound } from 'src/utils/errors'
import { MainSliderDto } from './main-slider.dto'
import { MainSliderRepository } from './main-slider.repository'

@Injectable()
export class MainSliderService {
	constructor(private readonly repository: MainSliderRepository) {}

	private fullFileName(fileName: string) {
		return `/static/${FILE_PATHS.mainSlider}/${fileName}`
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, MainSliderService.name)
		}

		const mainSlider = await this.repository.findById(id)
		if (!mainSlider) {
			notFound(`mainSlider by id = ${id}`, MainSliderService.name)
		}

		return mainSlider
	}

	async findMany({ isDeleted }: { isDeleted?: boolean }) {
		let data = await this.repository.findMany({ isDeleted })

		data = data.map(mainSlider => ({
			...mainSlider,
			imageName: this.fullFileName(mainSlider.imageName),
		}))

		return data
	}

	async findById(id: string) {
		const data = await this.checkExistence(id)

		data.imageName = this.fullFileName(data.imageName)

		return data
	}

	async create(mainSlider: MainSliderDto, file?: Express.Multer.File) {
		if (file) {
			mainSlider.imageName = file?.filename
		}

		if (!mainSlider.order) {
			const aggregation = await this.repository.findMaxOrder()

			if (!aggregation) {
				mainSlider.order = 1
			} else {
				mainSlider.order = aggregation._max.order + 1
			}
		}

		return await this.repository.create(mainSlider)
	}

	async change(
		id: string,
		mainSlider: MainSliderDto,
		file?: Express.Multer.File
	) {
		await this.checkExistence(id)

		if (file) {
			mainSlider.imageName = file?.filename
		}

		return await this.repository.change(id, mainSlider)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}
}
