import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProcedureDto } from './dto/procedure.dto'
import { ProcedureRepository } from './procedure.repository'

@Injectable()
export class ProcedureService {
	constructor(
		private readonly procedureRepository: ProcedureRepository,
		private readonly prisma: PrismaService
	) {}

	async findAll() {
		return this.procedureRepository.findAll()
	}

	async create(procedure: ProcedureDto) {
		let order = procedure.order
		if (order === undefined) {
			const lastProcedure = await this.procedureRepository.findLastOne()
			if (!lastProcedure) {
				order = 0
			} else {
				order = lastProcedure.order + 1
			}
		}

		const procedureDB = { ...procedure, order }
		return this.procedureRepository.create(procedureDB)
	}
}
