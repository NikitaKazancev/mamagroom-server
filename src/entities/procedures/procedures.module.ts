import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProceduresAPI } from './procedures.api'
import { ProceduresController } from './procedures.controller'
import { ProceduresRepository } from './procedures.repository'
import { ProceduresService } from './procedures.service'

@Module({
	imports: [],
	controllers: [ProceduresController],
	providers: [
		PrismaService,
		ProceduresService,
		ProceduresRepository,
		ProceduresAPI,
	],
	exports: [ProceduresAPI],
})
export class ProceduresModule {}
