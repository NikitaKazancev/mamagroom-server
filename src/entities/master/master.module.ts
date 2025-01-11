import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { MasterController } from './master.controller'
import { MasterRepository } from './master.repository'
import { MasterService } from './master.service'

@Module({
	controllers: [MasterController],
	providers: [
		MasterService,
		MasterRepository,
		PrismaService,
		PrismaReadService,
	],
	imports: [],
	exports: [MasterService],
})
export class MasterModule {}
