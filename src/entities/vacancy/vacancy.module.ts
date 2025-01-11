import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { VacancyController } from './vacancy.controller'
import { VacancyRepository } from './vacancy.repository'
import { VacancyService } from './vacancy.service'

@Module({
	controllers: [VacancyController],
	providers: [
		PrismaService,
		PrismaReadService,
		VacancyService,
		VacancyRepository,
	],
	imports: [],
	exports: [VacancyService],
})
export class VacancyModule {}
