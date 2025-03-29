import { Injectable } from '@nestjs/common'
import { MainSlider } from '@prisma/client'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { IMAGE_NOT_FOUND_URL } from 'src/utils/constants'
import { notFound } from 'src/utils/errors'
import { MainSliderDto, type RequiredMainSliderDto } from './main-slider.dto'
import { MainSliderRepository } from './main-slider.repository'

@Injectable()
export class MainSliderService {
	constructor(private readonly repository: MainSliderRepository) {}

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
		mainSlider.imageName = undefined
		if (file) {
			mainSlider.imageName = file?.filename
		}

		const filledMainSlider = await this.fillRequiredFields(mainSlider)
		return await this.repository.create(filledMainSlider)
	}

	async change(
		id: string,
		mainSlider: MainSliderDto,
		file?: Express.Multer.File
	) {
		const mainSliderInDb = await this.checkExistence(id)

		mainSlider.imageName = undefined
		if (file) {
			mainSlider.imageName = file?.filename
		}

		const filledMainSlider = this.fillRequiredFieldsByObject(
			mainSlider,
			mainSliderInDb
		)

		if (filledMainSlider.order !== mainSliderInDb.order) {
			return await this.repository.changeWithOrder(id, filledMainSlider)
		}

		return await this.repository.change(id, filledMainSlider)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

	private fullFileName(fileName: string) {
		return `/static/${FILE_PATHS.mainSlider}/${fileName}`
	}

	private async fillRequiredFields(
		mainSlider: MainSliderDto
	): Promise<RequiredMainSliderDto> {
		let order = mainSlider.order
		if (!order) {
			const aggregation = await this.repository.findMaxOrder()

			if (!aggregation) {
				order = 1
			} else {
				order = aggregation._max.order + 1
			}
		}

		let imageName = mainSlider.imageName
		if (!imageName) {
			imageName = IMAGE_NOT_FOUND_URL
		}

		return { ...mainSlider, order, imageName }
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

	private fillRequiredFieldsByObject(
		mainSlider: MainSliderDto,
		mainSliderInDb: MainSlider
	) {
		let order = mainSlider.order
		if (!order) {
			order = mainSliderInDb.order
		}

		let imageName = mainSlider.imageName
		if (!imageName) {
			imageName = mainSliderInDb.imageName
		}

		return { ...mainSlider, order, imageName }
	}
}
