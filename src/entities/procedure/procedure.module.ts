import { forwardRef, Module } from '@nestjs/common'
import { IntegrationModule } from 'src/integration/integration.module'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { ProcedureController } from './procedure.controller'
import { ProcedureRepository } from './procedure.repository'
import { ProcedureService } from './procedure.service'

@Module({
	imports: [forwardRef(() => IntegrationModule)],
	controllers: [ProcedureController],
	providers: [
		PrismaService,
		PrismaReadService,
		ProcedureService,
		ProcedureRepository,
	],
	exports: [ProcedureService],
})
export class ProcedureModule {}
