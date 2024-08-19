import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Language } from 'src/utils/constants'
import { conflict, notFound } from 'src/utils/errors'
import { ConstantRepository } from './constant.repository'
import { ConstantDto } from './dto/constant.dto'
import { objectFromConstants } from './utils/functions'

@Injectable()
export class ConstantService {
	constructor(
		private readonly constantRepository: ConstantRepository,
		private readonly prisma: PrismaService
	) {}

	async findMany({
		language,
		type,
		names,
	}: {
		language: Language
		type: string
		names?: string[]
	}) {
		const data = await this.constantRepository.findMany({
			language,
			type,
			names,
		})

		return objectFromConstants(data)
	}

	async createOne(dto: ConstantDto) {
		try {
			return await this.constantRepository.createOne(dto)
		} catch (error) {
			conflict('Constant', ConstantService.name, dto.language)
		}
	}

	async changeOne(dto: ConstantDto) {
		try {
			return await this.constantRepository.changeOne(dto)
		} catch (error) {
			notFound('Constant', ConstantService.name, dto.language)
		}
	}

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
