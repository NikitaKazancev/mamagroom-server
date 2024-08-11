import { Injectable } from '@nestjs/common'
import { ServiceAPI } from 'src/components/procedures/service.api'
import { BreedAPI } from 'src/entities/breed/breed.api'
import { PrismaService } from 'src/prisma.service'
import { PriceDto } from './dto/price.dto'
import { PriceRepository } from './price.repository'

@Injectable()
export class PriceService {
	constructor(
		private readonly priceRepository: PriceRepository,
		private readonly prisma: PrismaService,
		private readonly breedAPI: BreedAPI,
		private readonly serviceAPI: ServiceAPI
	) {}

	async findAll() {
		return this.priceRepository.findAll()
	}

	async create(price: PriceDto) {
		await this.breedAPI.checkBreedExistence(price.breedId)
		await this.serviceAPI.checkServiceExistence(price.serviceId)

		const priceDB = { ...price }
		return this.priceRepository.create(priceDB)
	}
}
