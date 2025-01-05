import { Injectable } from '@nestjs/common'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { MasterDto } from './master.dto'
import { MasterRepository } from './master.repository'

@Injectable()
export class MasterService {
	constructor(private readonly repository: MasterRepository) {}

	async findMany(filter: FindManyFilter) {
		let data = await this.repository.findMany(filter)

		data = data.map(master => ({
			...master,
			imageName: this.fullFileName(master.imageName),
		}))

		return data
	}

	async findById(id: string) {
		const data = await this.checkExistence(id)

		data.imageName = this.fullFileName(data.imageName)

		return data
	}

	async create(master: MasterDto, file?: Express.Multer.File) {
		await this.checkUniqFields(master)

		master.imageName = undefined
		if (file) {
			master.imageName = file?.filename
		}

		return await this.repository.create(master)
	}

	async change(id: string, master: MasterDto, file?: Express.Multer.File) {
		const masterInDb = await this.checkExistence(id)
		if (masterInDb.name !== master.name) {
			await this.checkUniqFields(master)
		}

		master.imageName = undefined
		if (file) {
			master.imageName = file?.filename
		}

		return await this.repository.change(id, master)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, MasterService.name)
		}

		const master = await this.repository.findById(id)
		if (!master) {
			notFound(`master by id = ${id}`, MasterService.name)
		}

		return master
	}

	private fullFileName(fileName: string) {
		return `/static/${FILE_PATHS.masters}/${fileName}`
	}

	private async checkUniqFields(master: MasterDto) {
		const masterInDb = await this.repository.findByName(master.name)

		if (masterInDb) {
			conflict(`master by name = ${master.name}`, MasterService.name)
		}

		return masterInDb
	}
}
