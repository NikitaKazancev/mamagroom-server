import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ResponseFromAIDto } from './response-from-ai.dto'

@Injectable()
export class ResponseFromAIRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany({ userDescription }: { userDescription?: string }) {
		return this.prisma.responseFromAI.findMany({
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
