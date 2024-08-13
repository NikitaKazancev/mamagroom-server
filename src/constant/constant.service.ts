import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ConstantRepository } from './constant.repository'
import { HeaderNavLinksDto } from './dto/header-nav-links.dto'

@Injectable()
export class ConstantService {
	constructor(
		private readonly constantRepository: ConstantRepository,
		private readonly prisma: PrismaService
	) {}

	async findAll() {
		return this.constantRepository.findAll()
	}

	async findHeaderNavLinks({
		isUsed,
		lang,
	}: {
		isUsed?: boolean
		lang?: string
	}) {
		const res = await this.constantRepository.findHeaderNavLinks({
			isUsed,
			lang,
		})

		res.value = JSON.parse(res.value)

		return res
	}

	createHeaderNavLinks(data: HeaderNavLinksDto) {
		return this.constantRepository.createHeaderNavLinks(data)
	}
}
