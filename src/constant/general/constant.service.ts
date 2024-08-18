import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Language } from 'src/utils/constants'
import { notFound } from 'src/utils/errors'
import { ConstantRepository } from './constant.repository'

@Injectable()
export class ConstantService {
	constructor(
		private readonly constantRepository: ConstantRepository,
		private readonly prisma: PrismaService
	) {}

	async deleteOne({
		language,
		type,
		name,
	}: {
		language: Language
		type: string
		name: string
	}) {
		try {
			return await this.constantRepository.deleteOne({
				language,
				type,
				name,
			})
		} catch (error) {
			notFound('Constant', ConstantService.name, language)
		}
	}
}
