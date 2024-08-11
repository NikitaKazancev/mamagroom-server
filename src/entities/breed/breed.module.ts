import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BreedController } from './breed.controller'
import { BreedRepository } from './breed.repository'
import { BreedService } from './breed.service'
import { BreedAPI } from './utils/breed.api'

@Module({
	controllers: [BreedController],
	providers: [PrismaService, BreedService, BreedRepository, BreedAPI],
	exports: [BreedAPI],
})
export class BreedModule {}
