import { Injectable } from '@nestjs/common'
import { Value } from '@prisma/client'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { IMAGE_NOT_FOUND_URL } from 'src/utils/constants'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { RequiredValueDto, ValueDto } from './value.dto'
import { ValueRepository } from './value.repository'

@Injectable()
export class ValueService {
	constructor(private readonly repository: ValueRepository) {}

	async findMany(filter: FindManyFilter) {
		let data = await this.repository.findMany(filter)

		data = data.map(value => ({
			...value,
			imageName: this.fullFileName(value.imageName),
		}))

		return data
	}

	async findById(id: string) {
		const data = await this.checkExistence(id)

		data.imageName = this.fullFileName(data.imageName)

		return data
	}

	async create(value: ValueDto, file?: Express.Multer.File) {
		await this.checkUniqFields(value)

		value.order = undefined
		value.imageName = undefined
		if (file) {
			value.imageName = file?.filename
		}

		const filledValue = await this.fillRequiredFields(value)
		return await this.repository.create(filledValue)
	}

	async change(id: string, value: ValueDto, file?: Express.Multer.File) {
		const valueInDb = await this.checkExistence(id)
		if (valueInDb.title !== value.title) {
			await this.checkUniqFields(value)
		}

		value.imageName = undefined
		if (file) {
			value.imageName = file?.filename
		}

		const filledValue = await this.fillRequiredFieldsByObject(
			value,
			valueInDb
		)

		if (filledValue.order !== valueInDb.order) {
			return await this.repository.changeWithOrder(id, filledValue)
		}

		return await this.repository.change(id, filledValue)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

	private fullFileName(fileName: string) {
		return `/static/${FILE_PATHS.values}/${fileName}`
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, ValueService.name)
		}

		const value = await this.repository.findById(id)
		if (!value) {
			notFound(`value by id = ${id}`, ValueService.name)
		}

		return value
	}

	private async checkUniqFields(value: ValueDto) {
		const valueInDb = await this.repository.findByTitle(value.title)

		if (valueInDb) {
			conflict(`value by title = ${value.title}`, ValueService.name)
		}

		return valueInDb
	}

	private async fillRequiredFields(
		value: ValueDto
	): Promise<RequiredValueDto> {
		let order = value.order
		if (!order) {
			const aggregation = await this.repository.findMaxOrder()

			if (!aggregation) {
				order = 1
			} else {
				order = aggregation._max.order + 1
			}
		}

		let imageName = value.imageName
		if (!imageName) {
			imageName = IMAGE_NOT_FOUND_URL
		}

		return { ...value, order, imageName }
	}

	private async fillRequiredFieldsByObject(
		value: ValueDto,
		valueInDb: Value
	): Promise<RequiredValueDto> {
		let order = value.order
		if (!order) {
			order = valueInDb.order
		}

		let imageName = value.imageName
		if (!imageName) {
			imageName = valueInDb.imageName
		}

		return { ...value, order, imageName }
	}
}
