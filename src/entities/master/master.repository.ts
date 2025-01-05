import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { MasterDto } from './master.dto'

@Injectable()
export class MasterRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: FindManyFilter & { name?: string }) {
		return this.prisma.master.findMany({
			where: {
				...filter,
			},
		})
	}

	findById(id: string) {
		return this.prisma.master.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prisma.master.findUnique({
			where: {
				name,
			},
		})
	}

	create(master: MasterDto) {
		return this.prisma.master.create({ data: master })
	}

	change(id: string, master: MasterDto) {
		return this.prisma.master.update({
			where: {
				id,
			},
			data: master,
		})
	}

	markToDelete(id: string) {
		return this.prisma.master.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
