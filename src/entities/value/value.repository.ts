import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { RequiredValueDto } from './value.dto'

@Injectable()
export class ValueRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: FindManyFilter & { title?: string }) {
		return this.prisma.value.findMany({
			where: {
				...filter,
			},
			orderBy: {
				order: 'asc',
			},
		})
	}

	findById(id: string) {
		return this.prisma.value.findUnique({
			where: {
				id,
			},
		})
	}

	findByTitle(title: string) {
		return this.prisma.value.findUnique({
			where: {
				title,
			},
		})
	}

	findMaxOrder() {
		return this.prisma.value.aggregate({
			_max: {
				order: true,
			},
		})
	}

	create(value: RequiredValueDto) {
		return this.prisma.value.create({ data: value })
	}

	change(id: string, value: RequiredValueDto) {
		return this.prisma.value.update({
			where: {
				id,
			},
			data: value,
		})
	}

	async changeWithOrder(id: string, value: RequiredValueDto) {
		const valueInDb = await this.prisma.value.count({
			where: {
				id: {
					not: id,
				},
				language: value.language,
				order: value.order,
			},
		})

		return await this.prisma.$transaction(async prisma => {
			if (valueInDb) {
				await prisma.value.updateMany({
					where: {
						id: {
							not: id,
						},
						language: value.language,
						order: {
							gte: value.order,
						},
					},
					data: {
						order: {
							increment: 1,
						},
					},
				})
			}

			return await prisma.value.update({
				where: {
					id,
				},
				data: value,
			})
		})
	}

	markToDelete(id: string) {
		return this.prisma.value.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
