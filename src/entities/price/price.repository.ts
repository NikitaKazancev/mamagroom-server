import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PriceDBDto } from './dto/price-db.dto'

@Injectable()
export class PriceRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.price.findMany({
			orderBy: { service: { order: 'asc' } },
			where: {
				isDeleted: false,
			},
		})
	}

	async create(price: PriceDBDto) {
		try {
			return await this.prisma.price.create({ data: price })
		} catch (error) {
			throw new HttpException('Price already exists', HttpStatus.CONFLICT)
		}
	}
}
