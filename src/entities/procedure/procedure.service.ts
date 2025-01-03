import { Injectable } from '@nestjs/common'
import { Procedure } from '@prisma/client'
import { IntegrationService } from 'src/integration/integration.service'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { ProcedureDto } from './procedure.dto'
import { ProcedureRepository } from './procedure.repository'

@Injectable()
export class ProcedureService {
	constructor(
		private readonly repository: ProcedureRepository,
		private readonly integrationService: IntegrationService
	) {}

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

	async findMany(
		filter: FindManyFilter,
		selection?: BooleanMappedType<Procedure>
	) {
		return await this.repository.findMany(filter, selection)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async findByUserData(description?: string, file?: Express.Multer.File) {
		const procedureIds = await this.integrationService.procedureIdsByUserData(
			{
				userDescription: description,
				imageName: file.filename,
			}
		)

		if (!procedureIds.length) {
			return []
		}

		return await this.repository.findByIds(procedureIds)
	}

	async findByBreed(breedId: string) {
		return await this.repository.findByBreed(breedId)
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
