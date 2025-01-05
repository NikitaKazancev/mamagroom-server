import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PriceDimensions, RequiredPriceDto } from './price.dto'

@Injectable()
export class PriceRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(dimensions?: Partial<PriceDimensions>) {
		return this.prisma.price.findMany({
			where: {
				...dimensions,
			},
		})
	}

	findUnique(dimensions: PriceDimensions) {
		return this.prisma.price.findUnique({
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
