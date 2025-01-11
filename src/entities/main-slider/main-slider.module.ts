import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { MainSliderController } from './main-slider.controller'
import { MainSliderRepository } from './main-slider.repository'
import { MainSliderService } from './main-slider.service'

@Module({
	controllers: [MainSliderController],
	providers: [
		MainSliderService,
		MainSliderRepository,
		PrismaService,
		PrismaReadService,
	],
	imports: [],
	exports: [MainSliderService],
})
export class MainSliderModule {}
