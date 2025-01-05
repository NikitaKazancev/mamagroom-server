import { Injectable } from '@nestjs/common'
import { conflict, notFound } from 'src/utils/errors'
import { BreedService } from '../breed/breed.service'
import { ProcedureService } from '../procedure/procedure.service'
import { PriceDimensions, PriceDto, RequiredPriceDto } from './price.dto'
import { PriceRepository } from './price.repository'

@Injectable()
export class PriceService {
	constructor(
		private readonly repository: PriceRepository,
		private readonly procedureService: ProcedureService,
		private readonly breedService: BreedService
	) {}

	async findMany(dimensions?: Partial<PriceDimensions>) {
		return await this.repository.findMany(dimensions)
	}

	async findUnique(dimensions: PriceDimensions) {
		return await this.checkExistence(dimensions)
	}

	async create(price: PriceDto) {
		const filledPrice = this.fillRequiredFields(price)

		const dimensions = this.dimensions(filledPrice)
		const priceInDb = await this.repository.findUnique(dimensions)
		if (priceInDb) {
			conflict(`price by dimensions = ${dimensions}`, PriceService.name)
		}

		await this.procedureService.checkExistence(filledPrice.procedureId)
		await this.breedService.checkExistence(filledPrice.breedId)

		return await this.repository.create(filledPrice)
	}

	async change(price: PriceDto) {
		const filledPrice = this.fillRequiredFields(price)
		const dimensions = this.dimensions(filledPrice)
		const priceInDb = await this.checkExistence(dimensions)

		if (filledPrice.procedureId !== priceInDb.procedureId) {
			await this.procedureService.checkExistence(filledPrice.procedureId)
		}
		if (filledPrice.breedId !== priceInDb.breedId) {
			await this.breedService.checkExistence(filledPrice.breedId)
		}

		return await this.repository.change(dimensions, filledPrice)
	}

	async delete(dimensions: PriceDimensions) {
		await this.checkExistence(dimensions)

		return await this.repository.delete(dimensions)
	}

	async checkExistence(dimensions: PriceDimensions) {
		if (!dimensions) {
			notFound(`dimensions are undefined`, PriceService.name)
		}

		const price = await this.repository.findUnique(dimensions)
		if (!price) {
			notFound(`price by dimensions = ${dimensions}`, PriceService.name)
		}

		return price
	}

	private dimensions(price: PriceDto): PriceDimensions {
		return {
			breedId: price.breedId,
			procedureId: price.procedureId,
			weight: price.weight,
			time: price.time,
		}
	}

	private fillRequiredFields(price: PriceDto): RequiredPriceDto {
		const time = price.time || 0
		const weight = price.weight || 0

		return { ...price, time, weight }
	}
}
