import { Injectable } from '@nestjs/common'
import { notFound } from 'src/utils/errors'
import { ResponseFromAIDto } from './response-from-ai.dto'
import { ResponseFromAIRepository } from './response-from-ai.repository'

@Injectable()
export class ResponseFromAIService {
	constructor(private readonly repository: ResponseFromAIRepository) {}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, ResponseFromAIService.name)
		}

		const responseFromAI = await this.repository.findById(id)
		if (!responseFromAI) {
			notFound(`responseFromAI by id = ${id}`, ResponseFromAIService.name)
		}

		return responseFromAI
	}

	async findMany({ userDescription }: { userDescription?: string } = {}) {
		return await this.repository.findMany({ userDescription })
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(responseFromAI: ResponseFromAIDto) {
		return await this.repository.create(responseFromAI)
	}

	async change(id: string, responseFromAI: ResponseFromAIDto) {
		await this.checkExistence(id)

		return await this.repository.change(id, responseFromAI)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.delete(id)
	}
}
