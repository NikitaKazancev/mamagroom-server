import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Procedure } from '@prisma/client'
import { IntegrationService } from 'src/integration/integration.service'
import { Language } from 'src/utils/constants'
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

	async findByUserData(
		description?: string,
		file?: Express.Multer.File,
		language?: Language
	) {
		const response = await this.integrationService.procedureIdsByUserData({
			userDescription: description,
			imageName: file?.filename,
			language,
		})

		if (!response.procedureIds.length) {
			return []
		}

		const procedures = await this.repository.findByIds(response.procedureIds)
		return { procedures, breedId: response.breedId }
	}

	async findByBreed(breedId: string, language: Language) {
		return await this.repository.findByBreed(breedId, language)
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
