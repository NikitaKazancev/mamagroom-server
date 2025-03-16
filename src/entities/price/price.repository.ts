import { Injectable } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { Language } from 'src/utils/constants'
import { PriceDto } from './price.dto'

@Injectable()
export class PriceRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany(
		filter: {
			isDeleted?: boolean
			breedId?: string
			procedureId?: string
			weight?: number
			time?: number
		},
		language?: Language
	) {
		return this.prismaRead.price.findMany({
			where: {
				...filter,
				procedure: {
					language,
				},
			},
			include: {
				procedure: {
					select: {
						name: true,
						id: true,
					},
				},
			},
			orderBy: {
				procedure: {
					name: 'asc',
				},
			},
		})
	}

	findById(id: string) {
		return this.prismaRead.price.findUnique({
			where: {
				id,
			},
		})
	}

	create(price: PriceDto) {
		return this.prisma.price.create({ data: price })
	}

	change(id: string, price: PriceDto) {
		return this.prisma.price.update({
			where: {
				id,
			},
			data: price,
		})
	}

	markToDelete(id: string) {
		return this.prisma.price.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
