import { Injectable } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { MasterDto } from './master.dto'

@Injectable()
export class MasterRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany(filter: FindManyFilter & { name?: string }) {
		return this.prismaRead.master.findMany({
			where: {
				...filter,
			},
			orderBy: {
				name: 'asc',
			},
		})
	}

	findById(id: string) {
		return this.prismaRead.master.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prismaRead.master.findUnique({
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
