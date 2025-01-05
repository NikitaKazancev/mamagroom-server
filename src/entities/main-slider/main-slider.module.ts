import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MainSliderController } from './main-slider.controller'
import { MainSliderRepository } from './main-slider.repository'
import { MainSliderService } from './main-slider.service'

@Module({
	controllers: [MainSliderController],
	providers: [MainSliderService, MainSliderRepository, PrismaService],
	imports: [],
	exports: [MainSliderService],
})
export class MainSliderModule {}
