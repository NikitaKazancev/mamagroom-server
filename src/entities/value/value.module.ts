import { forwardRef, Module } from '@nestjs/common'
import { FileModule } from 'src/file/file.module'
import { PrismaService } from 'src/prisma.service'
import { ValueController } from './value.controller'
import { ValueRepository } from './value.repository'
import { ValueService } from './value.service'

@Module({
	controllers: [ValueController],
	providers: [ValueService, ValueRepository, PrismaService],
	imports: [forwardRef(() => FileModule)],
	exports: [ValueRepository],
})
export class ValueModule {}
