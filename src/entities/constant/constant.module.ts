import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { ConstantController } from './constant.controller'
import { ConstantRepository } from './constant.repository'
import { ConstantService } from './constant.service'

@Module({
	controllers: [ConstantController],
	providers: [
		PrismaService,
		PrismaReadService,
		ConstantService,
		ConstantRepository,
	],
})
export class ConstantModule {}
