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

	async findAll({ lang }: { lang: string }) {
		return this.breedRepository.findAll({ lang })
	}

	async create(breed: BreedDto) {
		const breedDB = { ...breed }
		return this.breedRepository.create(breedDB)
	}
}
