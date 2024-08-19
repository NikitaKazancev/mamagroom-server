import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ValueController } from './value.controller'
import { ValueRepository } from './value.repository'
import { ValueService } from './value.service'

@Module({
	controllers: [ValueController],
	providers: [ValueService, ValueRepository, PrismaService],
})
export class ValueModule {}
