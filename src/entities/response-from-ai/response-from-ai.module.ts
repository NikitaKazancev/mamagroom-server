import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ResponseFromAIController } from './response-from-ai.controller'
import { ResponseFromAIRepository } from './response-from-ai.repository'
import { ResponseFromAIService } from './response-from-ai.service'

@Module({
	imports: [],
	controllers: [ResponseFromAIController],
	providers: [PrismaService, ResponseFromAIService, ResponseFromAIRepository],
	exports: [ResponseFromAIService],
})
export class ResponseFromAIModule {}
