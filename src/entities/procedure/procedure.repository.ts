import { Injectable } from '@nestjs/common'
import { Procedure } from '@prisma/client'
import { findProceduresByBreed } from '@prisma/client/sql'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { ProcedureDto } from './procedure.dto'

@Injectable()
export class ProcedureRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(
		filter: FindManyFilter & { name?: string },
		selection?: BooleanMappedType<Procedure>
	) {
		return this.prisma.procedure.findMany({
			where: {
				...filter,
			},
			select: selection,
		})
	}

	findByIds(ids: string[]) {
		return this.prisma.procedure.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		})
	}

	findById(id: string) {
		return this.prisma.procedure.findUnique({
			where: {
				id,
			},
		})
	}

	findByBreed(breedId: string) {
		return this.prisma.$queryRawTyped(findProceduresByBreed(breedId))
	}

	create(procedure: ProcedureDto) {
		return this.prisma.procedure.create({ data: procedure })
	}

	change(id: string, procedure: ProcedureDto) {
		return this.prisma.procedure.update({
			where: {
				id,
			},
			data: procedure,
		})
	}

	markToDelete(id: string) {
		return this.prisma.procedure.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
