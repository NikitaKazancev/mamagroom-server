import { Injectable } from '@nestjs/common'
import { conflict, notFound } from 'src/utils/errors'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'
import { ConstantRepository } from './constant.repository'

@Injectable()
export class ConstantService {
	constructor(private readonly repository: ConstantRepository) {}

	async findMany(dimensions: ConstantDimensionsDto) {
		console.log(dimensions)

		return await this.repository.findMany(dimensions)
	}

	async findUnique(dimensions: ConstantDimensionsDto) {
		return await this.checkExistence(dimensions)
	}

	async create(constant: ConstantDto) {
		const dimensions = this.dimensions(constant)
		const constantInDb = await this.repository.findUnique(dimensions)
		if (constantInDb) {
			conflict(
				`constant by dimensions = ${dimensions}`,
				ConstantService.name
			)
		}

		return await this.repository.create(constant)
	}

	async change(constant: ConstantDto) {
		const dimensions = this.dimensions(constant)
		await this.checkExistence(dimensions)

		return await this.repository.change(dimensions, constant)
	}

	async delete(dimensions: ConstantDimensionsDto) {
		await this.checkExistence(dimensions)

		return await this.repository.delete(dimensions)
	}

	async checkExistence(dimensions: ConstantDimensionsDto) {
		if (!dimensions) {
			notFound(`dimensions are undefined`, ConstantService.name)
		}

		const constant = await this.repository.findUnique(dimensions)
		if (!constant) {
			notFound(
				`constant by dimensions = ${dimensions}`,
				ConstantService.name
			)
		}

		return constant
	}

	private dimensions(constant: ConstantDto): ConstantDimensionsDto {
		return {
			language: constant.language,
			type: constant.type,
			name: constant.name,
		}
	}
}
