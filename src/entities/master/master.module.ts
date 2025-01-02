import { forwardRef, Module } from '@nestjs/common'
import { FileModule } from 'src/file/file.module'
import { PrismaService } from 'src/prisma.service'
import { MasterController } from './master.controller'
import { MasterRepository } from './master.repository'
import { MasterService } from './master.service'

@Module({
	controllers: [MasterController],
	providers: [MasterService, MasterRepository, PrismaService],
	imports: [forwardRef(() => FileModule)],
	exports: [MasterRepository],
})
export class MasterModule {}
