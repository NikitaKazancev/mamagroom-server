import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProcedureController } from './procedure.controller'
import { ProcedureRepository } from './procedure.repository'
import { ProcedureService } from './procedure.service'

@Module({
	imports: [],
	controllers: [ProcedureController],
	providers: [PrismaService, ProcedureService, ProcedureRepository],
	exports: [ProcedureService],
})
export class ProcedureModule {}
