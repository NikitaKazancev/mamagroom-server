import { Injectable } from '@nestjs/common'
import { conflict, notFound } from 'src/utils/errors'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'
import { ConstantRepository } from './constant.repository'

@Injectable()
export class ConstantService {
	constructor(private readonly repository: ConstantRepository) {}

	private async checkExistenceById(filter: ConstantDimensionsDto) {
		if (!filter) {
			notFound(`dimensions are undefined`, ConstantService.name)
		}

		const constant = await this.repository.findUnique(filter)
		if (!constant) {
			notFound(`constant by dimensions = ${filter}`, ConstantService.name)
		}

		return constant
	}

	async findMany(filter: ConstantDimensionsDto) {
		return await this.repository.findMany(filter)
	}

	async findUnique(filter: ConstantDimensionsDto) {
		return await this.checkExistenceById(filter)
	}

	async create(constant: ConstantDto) {
		const constantInDb = await this.repository.findMany({
			name: constant.name,
		})

		if (constantInDb.length) {
			conflict(`constant by name = ${constant.name}`, ConstantService.name)
		}

		return await this.repository.create(constant)
	}

	async change(constant: ConstantDto) {
		await this.checkExistenceById(constant)

		return await this.repository.change(constant, constant)
	}

	async delete(filter: ConstantDimensionsDto) {
		await this.checkExistenceById(filter)

		return await this.repository.delete(filter)
	}
}
