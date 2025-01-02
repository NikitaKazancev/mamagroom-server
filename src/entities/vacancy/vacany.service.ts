import { Injectable } from '@nestjs/common'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { VacancyDto } from './vacancy.dto'
import { VacancyRepository } from './vacancy.repository'

@Injectable()
export class VacancyService {
	constructor(private readonly vacancyRepository: VacancyRepository) {}

	private async checkVacancyExistenceById(id: string) {
		if (!id) {
			notFound(`id is undefined`, VacancyService.name)
		}

		const vacancy = await this.vacancyRepository.findById(id)
		if (!vacancy) {
			notFound(`vacancy by id = ${id}`, VacancyService.name)
		}

		return vacancy
	}

	async findMany(filter: FindManyFilter) {
		return await this.vacancyRepository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkVacancyExistenceById(id)
	}

	async create(vacancy: VacancyDto) {
		const vacancyInDb = await this.vacancyRepository.findMany({
			name: vacancy.name,
		})

		if (vacancyInDb.length) {
			conflict(`vacancy by name = ${vacancy.name}`, VacancyService.name)
		}

		return await this.vacancyRepository.create(vacancy)
	}

	async change(id: string, vacancy: VacancyDto) {
		await this.checkVacancyExistenceById(id)

		return await this.vacancyRepository.change(id, vacancy)
	}

	async delete(id: string) {
		await this.checkVacancyExistenceById(id)

		return await this.vacancyRepository.delete(id)
	}
}
