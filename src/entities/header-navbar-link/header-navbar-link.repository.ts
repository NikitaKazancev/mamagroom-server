import { Injectable } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { type RequiredHeaderNavbarLinkDto } from './header-navbar-link.dto'

@Injectable()
export class HeaderNavbarLinkRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany(filter: FindManyFilter & { name?: string }) {
		return this.prismaRead.headerNavbarLink.findMany({
			where: {
				...filter,
				parentLinkId: null,
			},
			orderBy: {
				order: 'asc',
			},
			include: {
				sublinks: {
					where: {
						...filter,
					},
					orderBy: {
						order: 'asc',
					},
				},
			},
		})
	}

	findById(id: string) {
		return this.prismaRead.headerNavbarLink.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prismaRead.headerNavbarLink.findUnique({
			where: {
				name,
			},
		})
	}

	findMaxOrder() {
		return this.prismaRead.headerNavbarLink.aggregate({
			_max: {
				order: true,
			},
		})
	}

	create(dto: RequiredHeaderNavbarLinkDto) {
		return this.prisma.headerNavbarLink.create({ data: dto })
	}

	change(id: string, dto: RequiredHeaderNavbarLinkDto) {
		return this.prisma.headerNavbarLink.update({
			where: {
				id,
			},
			data: dto,
		})
	}

	async changeWithOrder(id: string, dto: RequiredHeaderNavbarLinkDto) {
		const headerNavbarLinkInDb = await this.prisma.headerNavbarLink.count({
			where: {
				id: {
					not: id,
				},
				language: dto.language,
				parentLinkId: dto.parentLinkId,
				order: dto.order,
			},
		})

		return await this.prisma.$transaction(async prisma => {
			if (headerNavbarLinkInDb) {
				await prisma.headerNavbarLink.updateMany({
					where: {
						id: {
							not: id,
						},
						language: dto.language,
						parentLinkId: dto.parentLinkId,
						order: {
							gte: dto.order,
						},
					},
					data: {
						order: {
							increment: 1,
						},
					},
				})
			}

			return await prisma.headerNavbarLink.update({
				where: {
					id,
				},
				data: dto,
			})
		})
	}

	markToDelete(id: string) {
		return this.prisma.headerNavbarLink.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
