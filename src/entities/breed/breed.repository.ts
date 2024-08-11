import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BreedDBDto } from './dto/breed-db.dto'

@Injectable()
export class BreedRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.breed.findMany({
			orderBy: { name: 'asc' },
			where: {
				isDeleted: false,
			},
		})
	}

	findById(breedId: string) {
		return this.prisma.breed.findUnique({
			where: { id: breedId, isDeleted: false },
		})
	}

	async create(breed: BreedDBDto) {
		try {
			return await this.prisma.breed.create({ data: breed })
		} catch (error) {
			throw new HttpException('Breed already exists', HttpStatus.CONFLICT)
		}
	}
}
