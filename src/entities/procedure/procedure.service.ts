import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Procedure } from '@prisma/client'
import { IntegrationService } from 'src/integration/integration.service'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { type BooleanMappedType } from 'src/utils/types'
import { ProcedureDto } from './procedure.dto'
import { ProcedureRepository } from './procedure.repository'

@Injectable()
export class ProcedureService {
	constructor(
		private readonly repository: ProcedureRepository,
		@Inject(forwardRef(() => IntegrationService))
		private readonly integrationService: IntegrationService
	) {}

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
				imageName: file?.filename,
			}
		)

		if (!procedureIds.length) {
			return []
		}

		return await this.repository.findByIds(procedureIds)
	}

	async findByBreed(breedId: string) {
		return (await this.repository.findByBreed(breedId)) as Promise<
			{
				name: string
				id: string
				description: string
				language: string
				createdAt: Date
				updatedAt: Date
				isDeleted: boolean
			}[]
		>
	}

	async create(procedure: ProcedureDto) {
		await this.checkUniqFields(procedure)

		return await this.repository.create(procedure)
	}

	async change(id: string, procedure: ProcedureDto) {
		const procedureInDb = await this.checkExistence(id)
		if (procedureInDb.name !== procedure.name) {
			await this.checkUniqFields(procedure)
		}

		return await this.repository.change(id, procedure)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

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

	private async checkUniqFields(procedure: ProcedureDto) {
		const procedureInDb = await this.repository.findByName(procedure.name)

		if (procedureInDb) {
			conflict(
				`procedure by name = ${procedure.name}`,
				ProcedureService.name
			)
		}

		return procedureInDb
	}
}
