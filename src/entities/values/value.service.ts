import { Injectable } from '@nestjs/common'
import { FilterDto } from 'src/utils/dtos'
import { ValueRepository } from './value.repository'

@Injectable()
export class ValueService {
	constructor(private readonly repository: ValueRepository) {}

	async findMany(filter: FilterDto) {
		return await this.repository.findMany(filter)
	}
}
