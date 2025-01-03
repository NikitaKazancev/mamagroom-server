import { forwardRef, Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProcedureController } from './procedure.controller'
import { ProcedureRepository } from './procedure.repository'
import { ProcedureService } from './procedure.service'
import { IntegrationModule } from 'src/integration/integration.module'

@Module({
	imports: [forwardRef(() => IntegrationModule)],
	controllers: [ProcedureController],
	providers: [PrismaService, ProcedureService, ProcedureRepository],
	exports: [ProcedureService],
})
export class ProcedureModule {}
