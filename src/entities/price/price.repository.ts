import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PriceDimensionsDto, PriceDto } from './price.dto'

@Injectable()
export class PriceRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: Partial<PriceDimensionsDto>) {
		return this.prisma.price.findMany({
			where: {
				...filter,
			},
		})
	}

	findUnique(filter: PriceDimensionsDto) {
		return this.prisma.price.findUnique({
			where: {
				breedId_procedureId_weight_time: filter,
			},
		})
	}

	create(price: PriceDto) {
		return this.prisma.price.create({ data: price })
	}

	change(filter: PriceDimensionsDto, price: PriceDto) {
		return this.prisma.price.update({
			where: {
				breedId_procedureId_weight_time: filter,
			},
			data: price,
		})
	}

	delete(filter: PriceDimensionsDto) {
		return this.prisma.price.delete({
			where: {
				breedId_procedureId_weight_time: filter,
			},
		})
	}

	// findAll() {
	// 	return this.prisma.price.findMany({
	// 		orderBy: { procedure: { order: 'asc' } },
	// 		where: {
	// 			isDeleted: false,
	// 		},
	// 	})
	// }

	// async create(price: PriceDBDto) {
	// 	try {
	// 		return await this.prisma.price.create({ data: price })
	// 	} catch (error) {
	// 		throw new HttpException('Price already exists', HttpStatus.CONFLICT)
	// 	}
	// }
}
