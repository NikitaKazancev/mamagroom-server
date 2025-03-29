import { Injectable } from '@nestjs/common'
import { Breed, BreedType } from '@prisma/client'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { type BooleanMappedType } from 'src/utils/types'
import { BreedDto } from './breed.dto'

@Injectable()
export class BreedRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany(
		filter: FindManyFilter & { name?: string; type?: 'dogs' | 'cats' },
		selection?: BooleanMappedType<Breed>
	) {
		return this.prismaRead.breed.findMany({
			where: {
				...filter,
				type:
					filter.type === 'cats'
						? BreedType.cat
						: {
								not: BreedType.cat,
							},
			},
			select: selection,
			orderBy: { name: 'asc' },
		})
	}

	findById(id: string) {
		return this.prismaRead.breed.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prismaRead.breed.findUnique({
			where: {
				name,
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
