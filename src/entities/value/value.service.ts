import { Injectable } from '@nestjs/common'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { ValueDto } from './value.dto'
import { ValueRepository } from './value.repository'

@Injectable()
export class ValueService {
	constructor(private readonly repository: ValueRepository) {}

	private fullFileName(fileName: string) {
		return `/static/${FILE_PATHS.values}/${fileName}`
	}

	async checkExistenceById(id: string) {
		if (!id) {
			notFound(`id is undefined`, ValueService.name)
		}

		const value = await this.repository.findById(id)
		if (!value) {
			notFound(`value by id = ${id}`, ValueService.name)
		}

		return value
	}

	async findMany(filter: FindManyFilter) {
		let data = await this.repository.findMany(filter)

		data = data.map(value => ({
			...value,
			imageName: this.fullFileName(value.imageName),
		}))

		return data
	}

	async findById(id: string) {
		const data = await this.checkExistenceById(id)

		data.imageName = this.fullFileName(data.imageName)

		return data
	}

	async create(value: ValueDto, file?: Express.Multer.File) {
		const valueInDb = await this.repository.findMany({
			title: value.title,
		})

		if (valueInDb.length) {
			conflict(`value by title = ${value.title}`, ValueService.name)
		}

		if (file) {
			value.imageName = file?.filename
		}

		if (!value.order) {
			const aggregation = await this.repository.findMaxOrder()

			if (!aggregation) {
				value.order = 1
			} else {
				value.order = aggregation._max.order + 1
			}
		}

		return await this.repository.create(value)
	}

	async change(id: string, value: ValueDto, file?: Express.Multer.File) {
		await this.checkExistenceById(id)

		if (file) {
			value.imageName = file?.filename
		}

		return await this.repository.change(id, value)
	}

	async delete(id: string) {
		await this.checkExistenceById(id)

		return await this.repository.markToDelete(id)
	}
}
