import { Module } from '@nestjs/common'
import { BreedModule } from 'src/entities/breed/breed.module'
import { ServiceModule } from 'src/entities/procedures/procedures.module'
import { PrismaService } from 'src/prisma.service'
import { PriceController } from './price.controller'
import { PriceRepository } from './price.repository'
import { PriceService } from './price.service'

@Module({
	imports: [ServiceModule, BreedModule],
	controllers: [PriceController],
	providers: [PrismaService, PriceService, PriceRepository],
})
export class PriceModule {}
