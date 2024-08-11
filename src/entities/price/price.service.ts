import { Injectable } from '@nestjs/common'
import { BreedAPI } from 'src/entities/breed/utils/breed.api'
import { ProcedureAPI } from 'src/entities/procedure/utils/procedure.api'
import { PrismaService } from 'src/prisma.service'
import { PriceDto } from './dto/price.dto'
import { PriceRepository } from './price.repository'

@Injectable()
export class PriceService {
	constructor(
		private readonly priceRepository: PriceRepository,
		private readonly prisma: PrismaService,
		private readonly breedAPI: BreedAPI,
		private readonly procedureAPI: ProcedureAPI
	) {}

	async findAll() {
		return this.priceRepository.findAll()
	}

	async create(price: PriceDto) {
		await this.breedAPI.checkBreedExistence(price.breedId)
		await this.procedureAPI.checkProcedureExistence(price.procedureId)

		const priceDB = { ...price }
		return this.priceRepository.create(priceDB)
	}
}
