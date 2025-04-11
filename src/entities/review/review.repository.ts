import { Injectable } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { ReviewDto } from './review.dto'

@Injectable()
export class ReviewRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly prismaRead: PrismaReadService
	) {}

	findMany() {
		return this.prismaRead.review.findMany({
			orderBy: {
				date: 'desc',
			},
		})
	}

	findById(id: string) {
		return this.prismaRead.review.findUnique({
			where: {
				id,
			},
		})
	}

	create(review: ReviewDto) {
		return this.prisma.review.create({ data: review })
	}

	change(id: string, review: ReviewDto) {
		return this.prisma.review.update({
			where: {
				id,
			},
			data: review,
		})
	}

	delete(id: string) {
		return this.prisma.review.delete({
			where: {
				id,
			},
		})
	}
}
