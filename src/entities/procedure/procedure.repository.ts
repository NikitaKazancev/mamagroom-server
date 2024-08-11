import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProcedureDBDto } from './dto/procedure-db.dto'

@Injectable()
export class ProcedureRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.procedure.findMany({
			orderBy: { order: 'asc' },
			where: {
				isDeleted: false,
			},
		})
	}

	findById(procedureId: string) {
		return this.prisma.procedure.findUnique({
			where: { id: procedureId, isDeleted: false },
		})
	}

	findLastOne() {
		return this.prisma.procedure.findFirst({ orderBy: { order: 'desc' } })
	}

	async create(procedure: ProcedureDBDto) {
		try {
			return await this.prisma.procedure.create({ data: procedure })
		} catch (error) {
			throw new HttpException(
				'Procedure already exists',
				HttpStatus.CONFLICT
			)
		}
	}
}
