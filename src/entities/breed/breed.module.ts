import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BreedAPI } from './breed.api'
import { BreedController } from './breed.controller'
import { BreedRepository } from './breed.repository'
import { BreedService } from './breed.service'

@Module({
	controllers: [BreedController],
	providers: [PrismaService, BreedService, BreedRepository, BreedAPI],
	exports: [BreedAPI],
})
export class BreedModule {}
