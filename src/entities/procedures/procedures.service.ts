import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProceduresDto } from './dto/procedures.dto'
import { ProceduresRepository } from './procedures.repository'

@Injectable()
export class ProceduresService {
	constructor(
		private readonly proceduresRepository: ProceduresRepository,
		private readonly prisma: PrismaService
	) {}

	async findAll() {
		return this.proceduresRepository.findAll()
	}

	async create(procedures: ProceduresDto) {
		let order = procedures.order
		if (order === undefined) {
			const lastProcedures = await this.proceduresRepository.findLastOne()
			if (!lastProcedures) {
				order = 0
			} else {
				order = lastProcedures.order + 1
			}
		}

		const proceduresDB = { ...procedures, order }
		return this.proceduresRepository.create(proceduresDB)
	}
}
