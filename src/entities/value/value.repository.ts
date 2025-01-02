import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { ValueDto } from './value.dto'

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

	findMaxOrder() {
		return this.prisma.value.aggregate({
			_max: {
				order: true,
			},
		})
	}

	create(value: ValueDto) {
		return this.prisma.value.create({ data: value })
	}

	change(id: string, value: ValueDto) {
		return this.prisma.value.update({
			where: {
				id,
			},
			data: value,
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
