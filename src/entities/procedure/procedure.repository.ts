import { Injectable } from '@nestjs/common'
import { Procedure } from '@prisma/client'
// import { findProceduresByBreed } from '@prisma/client/sql'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { Language } from 'src/utils/constants'
import { FindManyFilter } from 'src/utils/dtos'
import { type BooleanMappedType } from 'src/utils/types'
import { ProcedureDto } from './procedure.dto'

@Injectable()
export class ProcedureRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany(
		filter: FindManyFilter & { name?: string },
		selection?: BooleanMappedType<Procedure>
	) {
		return this.prismaRead.procedure.findMany({
			where: {
				...filter,
			},
			select: selection,
		})
	}

	findByIds(ids: string[]) {
		return this.prismaRead.procedure.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		})
	}

	findById(id: string) {
		return this.prismaRead.procedure.findUnique({
			where: {
				id,
			},
		})
	}

	findByName(name: string) {
		return this.prismaRead.procedure.findUnique({
			where: {
				name,
			},
		})
	}

	findByBreed(breedId: string, language: Language) {
		return this.prismaRead.$queryRaw`
				SELECT DISTINCT procedures.id, procedures.name
				FROM prices
				LEFT JOIN procedures ON prices.procedure_id = procedures.id
				WHERE prices.breed_id = ${breedId}
				AND procedures.language = ${language}
			` as Promise<
			{
				name: string
				id: string
				description: string
				language: string
				createdAt: Date
				updatedAt: Date
				isDeleted: boolean
			}[]
		>
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
