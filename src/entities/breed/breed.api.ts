import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { BreedRepository } from './breed.repository'

@Injectable()
export class BreedAPI {
	constructor(private readonly breedRepository: BreedRepository) {}

	async checkBreedExistence(breedId: string) {
		const breed = await this.breedExists(breedId)
		if (!breed) {
			throw new HttpException('Breed not found', HttpStatus.NOT_FOUND)
		}

		return breed
	}

	async breedExists(breedId: string) {
		return await this.breedRepository.findById(breedId)
	}
}
