import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { ReviewController } from './review.controller'
import { ReviewRepository } from './review.repository'
import { ReviewService } from './review.service'

@Module({
	controllers: [ReviewController],
	providers: [
		ReviewService,
		ReviewRepository,
		PrismaService,
		PrismaReadService,
	],
	imports: [],
	exports: [ReviewService],
})
export class ReviewModule {}
