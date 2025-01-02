import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ResponseFromAIDto } from './response-from-ai.dto'

@Injectable()
export class ResponseFromAIRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany() {
		return this.prisma.responseFromAI.findMany({
			include: {
				procedures: {
					select: {
						id: true,
					},
				},
			},
		})
	}

	findById(id: string) {
		return this.prisma.responseFromAI.findUnique({
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
				userDescription: responseFromAI.userDescription,
				breedId: responseFromAI.breedId,
				procedures: {
					connect: responseFromAI.procedureIds.map(id => ({ id })),
				},
			},
		})
	}

	change(id: string, responseFromAI: ResponseFromAIDto) {
		return this.prisma.responseFromAI.update({
			where: {
				id,
			},
			data: {
				userDescription: responseFromAI.userDescription,
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
