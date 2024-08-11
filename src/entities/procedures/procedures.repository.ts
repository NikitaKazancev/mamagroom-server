import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProceduresDBDto } from './dto/procedures-db.dto'

@Injectable()
export class ProceduresRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.service.findMany({
			orderBy: { order: 'asc' },
			where: {
				isDeleted: false,
			},
		})
	}

	findById(proceduresId: string) {
		return this.prisma.service.findUnique({
			where: { id: proceduresId, isDeleted: false },
		})
	}

	findLastOne() {
		return this.prisma.service.findFirst({ orderBy: { order: 'desc' } })
	}

	async create(procedures: ProceduresDBDto) {
		try {
			return await this.prisma.service.create({ data: procedures })
		} catch (error) {
			throw new HttpException(
				'Procedures already exists',
				HttpStatus.CONFLICT
			)
		}
	}
}
