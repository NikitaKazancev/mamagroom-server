import { Injectable } from '@nestjs/common'
import { Breed } from '@prisma/client'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { BreedDto } from './breed.dto'
import { BreedRepository } from './breed.repository'

@Injectable()
export class BreedService {
	constructor(private readonly repository: BreedRepository) {}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, BreedService.name)
		}

		const breed = await this.repository.findById(id)
		if (!breed) {
			notFound(`breed by id = ${id}`, BreedService.name)
		}

		return breed
	}

	async findMany(
		filter: FindManyFilter,
		selection?: BooleanMappedType<Breed>
	) {
		return await this.repository.findMany(filter, selection)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(breed: BreedDto) {
		const breedInDb = await this.repository.findMany({
			name: breed.name,
		})

		if (breedInDb.length) {
			conflict(`breed by name = ${breed.name}`, BreedService.name)
		}

		return await this.repository.create(breed)
	}

	async change(id: string, breed: BreedDto) {
		await this.checkExistence(id)

		return await this.repository.change(id, breed)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}
}
