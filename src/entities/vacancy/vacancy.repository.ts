import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { VacancyDto } from './vacancy.dto'

@Injectable()
export class VacancyRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: FindManyFilter & { name?: string }) {
		return this.prisma.vacancy.findMany({
			where: {
				...filter,
			},
		})
	}

	findById(id: string) {
		return this.prisma.vacancy.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prisma.vacancy.findUnique({
			where: {
				name,
			},
		})
	}

	create(vacancy: VacancyDto) {
		return this.prisma.vacancy.create({ data: vacancy })
	}

	change(id: string, vacancy: VacancyDto) {
		return this.prisma.vacancy.update({
			where: {
				id,
			},
			data: vacancy,
		})
	}

	markToDelete(id: string) {
		return this.prisma.vacancy.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
