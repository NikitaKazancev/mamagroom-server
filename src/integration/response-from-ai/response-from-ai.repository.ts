import { Injectable } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { ResponseFromAIDto } from './response-from-ai.dto'

@Injectable()
export class ResponseFromAIRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany({
		userDescription,
		amount,
	}: {
		userDescription?: string
		amount?: number
	}) {
		return this.prismaRead.responseFromAI.findMany({
			where: {
				userDescription: {
					contains: userDescription,
				},
			},
			include: {
				procedures: {
					select: {
						id: true,
					},
				},
			},
			take: amount,
			orderBy: {
				createdAt: 'desc',
			},
		})
	}

	findById(id: string) {
		return this.prismaRead.responseFromAI.findUnique({
			where: {
				id,
			},
			include: {
				procedures: {
					select: {
						id: true,
					},
				},
			},
		})
	}

	create(responseFromAI: ResponseFromAIDto) {
		return this.prisma.responseFromAI.create({
			data: {
				model: responseFromAI.model,
				userDescription: responseFromAI.userDescription,
				imageName: responseFromAI.imageName,
				breedId: responseFromAI.breedId,
				procedures: {
					connect: responseFromAI.procedureIds.map(id => ({ id })),
				},
			},
		})
	}

	delete(id: string) {
		return this.prisma.responseFromAI.delete({
			where: {
				id,
			},
		})
	}
}
