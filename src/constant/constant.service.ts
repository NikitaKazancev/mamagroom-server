import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ConstantRepository } from './constant.repository'

@Injectable()
export class ConstantService {
	constructor(
		private readonly constantRepository: ConstantRepository,
		private readonly prisma: PrismaService
	) {}

	async findAll() {
		return this.constantRepository.findAll()
	}
}
