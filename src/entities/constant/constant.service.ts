import { Injectable } from '@nestjs/common'
import { conflict, notFound } from 'src/utils/errors'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'
import { ConstantRepository } from './constant.repository'

@Injectable()
export class ConstantService {
	constructor(private readonly repository: ConstantRepository) {}

	async checkExistence(filter: ConstantDimensionsDto) {
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
		return await this.checkExistence(filter)
	}

	async create(constant: ConstantDto) {
		const constantInDb = await this.repository.findUnique(constant)

		if (constantInDb) {
			conflict(`constant by dimensions = ${constant}`, ConstantService.name)
		}

		return await this.repository.create(constant)
	}

	async change(constant: ConstantDto) {
		await this.checkExistence(constant)

		return await this.repository.change(constant, constant)
	}

	async delete(filter: ConstantDimensionsDto) {
		await this.checkExistence(filter)

		return await this.repository.delete(filter)
	}
}
