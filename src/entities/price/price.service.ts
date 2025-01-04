import { Injectable } from '@nestjs/common'
import { conflict, notFound } from 'src/utils/errors'
import { BreedService } from '../breed/breed.service'
import { ProcedureService } from '../procedure/procedure.service'
import { PriceDimensionsDto, PriceDto } from './price.dto'
import { PriceRepository } from './price.repository'

@Injectable()
export class PriceService {
	constructor(
		private readonly repository: PriceRepository,
		private readonly procedureService: ProcedureService,
		private readonly breedService: BreedService
	) {}

	async checkExistence(filter: PriceDimensionsDto) {
		if (!filter) {
			notFound(`dimensions are undefined`, PriceService.name)
		}

		const price = await this.repository.findUnique(filter)
		if (!price) {
			notFound(`price by dimensions = ${filter}`, PriceService.name)
		}

		return price
	}

	async findMany(filter: Partial<PriceDimensionsDto>) {
		return await this.repository.findMany(filter)
	}

	async findUnique(filter: PriceDimensionsDto) {
		return await this.checkExistence(filter)
	}

	async create(price: PriceDto) {
		const priceInDb = await this.repository.findUnique(price)

		if (priceInDb) {
			conflict(`price by dimensions = ${price}`, PriceService.name)
		}

		await this.procedureService.checkExistence(price.procedureId)
		await this.breedService.checkExistence(price.breedId)

		return await this.repository.create(price)
	}

	async change(price: PriceDto) {
		await this.checkExistence(price)

		return await this.repository.change(price, price)
	}

	async delete(filter: PriceDimensionsDto) {
		await this.checkExistence(filter)

		return await this.repository.delete(filter)
	}
}
