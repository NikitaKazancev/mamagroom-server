import { Module } from '@nestjs/common'
import { BreedModule } from 'src/entities/breed/breed.module'
import { ProcedureModule } from 'src/entities/procedure/procedure.module'
import { PrismaService } from 'src/prisma.service'
import { PriceController } from './price.controller'
import { PriceRepository } from './price.repository'
import { PriceService } from './price.service'

@Module({
	imports: [ProcedureModule, BreedModule],
	controllers: [PriceController],
	providers: [PrismaService, PriceService, PriceRepository],
})
export class PriceModule {}
