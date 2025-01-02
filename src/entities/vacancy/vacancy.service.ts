import { Injectable } from '@nestjs/common'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { VacancyDto } from './vacancy.dto'
import { VacancyRepository } from './vacancy.repository'

@Injectable()
export class VacancyService {
	constructor(private readonly repository: VacancyRepository) {}

	private async checkExistenceById(id: string) {
		if (!id) {
			notFound(`id is undefined`, VacancyService.name)
		}

		const vacancy = await this.repository.findById(id)
		if (!vacancy) {
			notFound(`vacancy by id = ${id}`, VacancyService.name)
		}

		return vacancy
	}

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistenceById(id)
	}

	async create(vacancy: VacancyDto) {
		const vacancyInDb = await this.repository.findMany({
			name: vacancy.name,
		})

		if (vacancyInDb.length) {
			conflict(`vacancy by name = ${vacancy.name}`, VacancyService.name)
		}

		return await this.repository.create(vacancy)
	}

	async change(id: string, vacancy: VacancyDto) {
		await this.checkExistenceById(id)

		return await this.repository.change(id, vacancy)
	}

	async delete(id: string) {
		await this.checkExistenceById(id)

		return await this.repository.markToDelete(id)
	}
}
