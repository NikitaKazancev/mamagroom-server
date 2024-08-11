import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ProceduresRepository } from './procedures.repository'

@Injectable()
export class ProceduresAPI {
	constructor(private readonly proceduresRepository: ProceduresRepository) {}

	async checkProceduresExistence(proceduresId: string) {
		const procedures = await this.proceduresExists(proceduresId)
		if (!procedures) {
			throw new HttpException('Procedures not found', HttpStatus.NOT_FOUND)
		}

		return procedures
	}

	async proceduresExists(proceduresId: string) {
		return await this.proceduresRepository.findById(proceduresId)
	}
}
