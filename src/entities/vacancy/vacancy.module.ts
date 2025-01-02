import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { VacancyController } from './vacancy.controller'
import { VacancyRepository } from './vacancy.repository'
import { VacancyService } from './vacancy.service'

@Module({
	controllers: [VacancyController],
	providers: [PrismaService, VacancyService, VacancyRepository],
	imports: [],
	exports: [],
})
export class VacancyModule {}
