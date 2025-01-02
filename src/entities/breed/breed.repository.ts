import { Injectable } from '@nestjs/common'
import { BreedType } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { BreedDto } from './breed.dto'

@Injectable()
export class BreedRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: FindManyFilter & { name?: string; type?: BreedType }) {
		return this.prisma.breed.findMany({
			where: {
				...filter,
			},
		})
	}

	findById(id: string) {
		return this.prisma.breed.findUnique({
			where: {
				id,
			},
		})
	}

	create(breed: BreedDto) {
		return this.prisma.breed.create({ data: breed })
	}

	change(id: string, breed: BreedDto) {
		return this.prisma.breed.update({
			where: {
				id,
			},
			data: breed,
		})
	}

	markToDelete(id: string) {
		return this.prisma.breed.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
