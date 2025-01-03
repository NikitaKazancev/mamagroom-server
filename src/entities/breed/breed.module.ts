import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BreedController } from './breed.controller'
import { BreedRepository } from './breed.repository'
import { BreedService } from './breed.service'

@Module({
	controllers: [BreedController],
	providers: [PrismaService, BreedService, BreedRepository],
	exports: [BreedService],
})
export class BreedModule {}
