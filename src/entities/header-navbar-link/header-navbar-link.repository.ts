import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { HeaderNavbarLinkDto } from './header-navbar-link.dto'

@Injectable()
export class HeaderNavbarLinkRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: FindManyFilter & { name?: string }) {
		return this.prisma.headerNavbarLink.findMany({
			where: {
				...filter,
				parentLinkId: null,
			},
			orderBy: {
				order: 'asc',
			},
			select: {
				id: true,
				name: true,
				link: true,

				sublinks: {
					where: {
						...filter,
					},
					select: {
						id: true,
						name: true,
						link: true,
					},
					orderBy: {
						order: 'asc',
					},
				},
			},
		})
	}

	findById(id: string) {
		return this.prisma.headerNavbarLink.findUnique({
			where: {
				id,
			},
		})
	}

	findMaxOrder() {
		return this.prisma.headerNavbarLink.aggregate({
			_max: {
				order: true,
			},
		})
	}

	create(dto: HeaderNavbarLinkDto) {
		return this.prisma.headerNavbarLink.create({ data: dto })
	}

	change(id: string, dto: HeaderNavbarLinkDto) {
		return this.prisma.headerNavbarLink.update({
			where: {
				id,
			},
			data: dto,
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
