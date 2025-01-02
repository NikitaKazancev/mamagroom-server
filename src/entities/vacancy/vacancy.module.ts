import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [],
	providers: [PrismaService],
	imports: [],
	exports: [],
})
export class VacancyModule {}
