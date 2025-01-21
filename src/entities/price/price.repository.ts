import { Injectable } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { type PriceDimensions, type RequiredPriceDto } from './price.dto'

@Injectable()
export class PriceRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany(dimensions?: Partial<PriceDimensions>) {
		return this.prismaRead.price.findMany({
			where: {
				...dimensions,
			},
		})
	}

	findUnique(dimensions: PriceDimensions) {
		return this.prismaRead.price.findUnique({
			where: {
				breedId_procedureId_weight_time: dimensions,
			},
		})
	}

	create(price: RequiredPriceDto) {
		return this.prisma.price.create({ data: price })
	}

	change(dimensions: PriceDimensions, price: RequiredPriceDto) {
		return this.prisma.price.update({
			where: {
				breedId_procedureId_weight_time: dimensions,
			},
			data: price,
		})
	}

	delete(dimensions: PriceDimensions) {
		return this.prisma.price.delete({
			where: {
				breedId_procedureId_weight_time: dimensions,
			},
		})
	}
}
