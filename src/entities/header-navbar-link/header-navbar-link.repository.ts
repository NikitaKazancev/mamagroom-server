import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FilterDto } from 'src/utils/dtos'
import { HeaderNavbarLinkDto } from './dto/header-navbar-link.dto'

@Injectable()
export class HeaderNavbarLinkRepository {
	constructor(private readonly prisma: PrismaService) {}

	findOne(filter: FilterDto) {
		return this.prisma.headerNavbarLink.findFirst({
			where: {
				...filter,
			},
		})
	}

	findMany(filter: FilterDto) {
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

	createOne(dto: HeaderNavbarLinkDto) {
		return this.prisma.headerNavbarLink.create({
			data: {
				name: dto.name,
				link: dto.link,
				parentLinkId: dto.parentLinkId,
				order: dto.order,
			},
		})
	}

	changeOne(id: string, dto: HeaderNavbarLinkDto) {
		return this.prisma.headerNavbarLink.update({
			data: {
				name: dto.name,
				link: dto.link,
				parentLinkId: dto.parentLinkId,
			},
			where: {
				id,
			},
		})
	}

	deleteOne(id: string) {
		return this.prisma.headerNavbarLink.update({
			data: {
				isDeleted: true,
				isUsed: false,
			},
			where: {
				id,
			},
		})
	}

	deleteOnePermanently(id: string) {
		return this.prisma.headerNavbarLink.deleteMany({
			where: {
				id,
			},
		})
	}
}
