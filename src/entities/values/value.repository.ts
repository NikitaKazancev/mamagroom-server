import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FilterDto } from 'src/utils/dtos'

@Injectable()
export class ValueRepository {
	constructor(private readonly prisma: PrismaService) {}

	findOne(filter: FilterDto) {
		return this.prisma.value.findFirst({
			where: {
				...filter,
			},
		})
	}

	findMany(filter: FilterDto) {
		return this.prisma.value.findMany({
			where: {
				...filter,
			},
			orderBy: {
				order: 'asc',
			},
			select: {
				id: true,
				title: true,
				description: true,
			},
		})
	}
}
