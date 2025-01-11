import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { ValueController } from './value.controller'
import { ValueRepository } from './value.repository'
import { ValueService } from './value.service'

@Module({
	controllers: [ValueController],
	providers: [ValueService, ValueRepository, PrismaService, PrismaReadService],
	imports: [],
	exports: [ValueService],
})
export class ValueModule {}
