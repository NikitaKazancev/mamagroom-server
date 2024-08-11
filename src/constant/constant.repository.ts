import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ConstantRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.constant.findMany({})
	}
}
