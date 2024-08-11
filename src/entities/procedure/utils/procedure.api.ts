import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ProcedureRepository } from '../procedure.repository'

@Injectable()
export class ProcedureAPI {
	constructor(private readonly procedureRepository: ProcedureRepository) {}

	async checkProcedureExistence(procedureId: string) {
		const procedure = await this.procedureExists(procedureId)
		if (!procedure) {
			throw new HttpException('Procedure not found', HttpStatus.NOT_FOUND)
		}

		return procedure
	}

	async procedureExists(procedureId: string) {
		return await this.procedureRepository.findById(procedureId)
	}
}
