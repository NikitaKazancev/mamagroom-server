import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BreedRepository } from './breed.repository'
import { BreedDto } from './dto/breed.dto'

@Injectable()
export class BreedService {
	constructor(
		private readonly breedRepository: BreedRepository,
		private readonly prisma: PrismaService
	) {}

	async findAll() {
		return this.breedRepository.findAll()
	}

	async create(breed: BreedDto) {
		const breedDB = { ...breed }
		return this.breedRepository.create(breedDB)
	}
}
