import { Injectable } from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { conflict, notFound } from 'src/utils/errors'
import { BreedService } from '../breed/breed.service'
import { ProcedureService } from '../procedure/procedure.service'
import { PriceDto } from './price.dto'
import { PriceRepository } from './price.repository'

@Injectable()
export class PriceService {
	constructor(
		private readonly repository: PriceRepository,
		private readonly procedureService: ProcedureService,
		private readonly breedService: BreedService
	) {}

	async findMany(
		filter: {
			isDeleted?: boolean
			breedId?: string
			procedureId?: string
			weight?: number
			time?: number
		},
		language?: Language
	) {
		return await this.repository.findMany(filter, language)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(price: PriceDto) {
		await this.checkUniqCombination(price)

		await this.procedureService.checkExistence(price.procedureId)
		await this.breedService.checkExistence(price.breedId)

		return await this.repository.create(price)
	}

	async change(id: string, price: PriceDto) {
		const priceInDb = await this.checkExistence(id)
		if (
			priceInDb.breedId !== price.breedId ||
			priceInDb.procedureId !== price.procedureId ||
			priceInDb.weight !== price.weight ||
			priceInDb.time !== price.time
		) {
			await this.checkUniqCombination(price)
		}

		return await this.repository.change(id, price)
	}

	async delete(id: string) {
		await this.checkExistence(id)
		return await this.repository.markToDelete(id)
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, PriceService.name)
		}

		const price = await this.repository.findById(id)
		if (!price) {
			notFound(`price by id = ${id}`, PriceService.name)
		}

		return price
	}

	private async checkUniqCombination(price: PriceDto) {
		const priceInDb = await this.repository.findMany({
			...price,
			isDeleted: undefined,
		})

		if (priceInDb.length) {
			conflict(`price by fields`, PriceService.name)
		}

		return priceInDb
	}
}
