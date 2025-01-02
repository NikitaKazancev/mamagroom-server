import { Injectable } from '@nestjs/common'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { ProcedureDto } from './procedure.dto'
import { ProcedureRepository } from './procedure.repository'

@Injectable()
export class ProcedureService {
	constructor(private readonly repository: ProcedureRepository) {}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, ProcedureService.name)
		}

		const procedure = await this.repository.findById(id)
		if (!procedure) {
			notFound(`procedure by id = ${id}`, ProcedureService.name)
		}

		return procedure
	}

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(procedure: ProcedureDto) {
		const procedureInDb = await this.repository.findMany({
			name: procedure.name,
		})

		if (procedureInDb.length) {
			conflict(
				`procedure by name = ${procedure.name}`,
				ProcedureService.name
			)
		}

		return await this.repository.create(procedure)
	}

	async change(id: string, procedure: ProcedureDto) {
		await this.checkExistence(id)

		return await this.repository.change(id, procedure)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}
}
