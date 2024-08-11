import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProcedureController } from './procedure.controller'
import { ProcedureRepository } from './procedure.repository'
import { ProcedureService } from './procedure.service'
import { ProcedureAPI } from './utils/procedure.api'

@Module({
	imports: [],
	controllers: [ProcedureController],
	providers: [
		PrismaService,
		ProcedureService,
		ProcedureRepository,
		ProcedureAPI,
	],
	exports: [ProcedureAPI],
})
export class ProcedureModule {}
