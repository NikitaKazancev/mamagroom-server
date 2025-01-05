import { Injectable } from '@nestjs/common'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { VacancyDto } from './vacancy.dto'
import { VacancyRepository } from './vacancy.repository'

@Injectable()
export class VacancyService {
	constructor(private readonly repository: VacancyRepository) {}

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(vacancy: VacancyDto) {
		await this.checkUniqFields(vacancy)

		return await this.repository.create(vacancy)
	}

	async change(id: string, vacancy: VacancyDto) {
		const vacancyInDb = await this.checkExistence(id)
		if (vacancyInDb.name !== vacancy.name) {
			await this.checkUniqFields(vacancy)
		}

		return await this.repository.change(id, vacancy)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, VacancyService.name)
		}

		const vacancy = await this.repository.findById(id)
		if (!vacancy) {
			notFound(`vacancy by id = ${id}`, VacancyService.name)
		}

		return vacancy
	}

	private async checkUniqFields(vacancy: VacancyDto) {
		const vacancyInDb = await this.repository.findByName(vacancy.name)

		if (vacancyInDb) {
			conflict(`vacancy by name = ${vacancy.name}`, VacancyService.name)
		}

		return vacancyInDb
	}
}
