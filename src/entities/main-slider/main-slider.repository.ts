import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MainSliderDto } from './main-slider.dto'

@Injectable()
export class MainSliderRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany({ isDeleted }: { isDeleted?: boolean }) {
		return this.prisma.mainSlider.findMany({
			where: {
				isDeleted,
			},
			orderBy: {
				order: 'asc',
			},
		})
	}

	findById(id: string) {
		return this.prisma.mainSlider.findUnique({
			where: {
				id,
			},
		})
	}

	findMaxOrder() {
		return this.prisma.mainSlider.aggregate({
			_max: {
				order: true,
			},
		})
	}

	create(mainSlider: MainSliderDto) {
		return this.prisma.mainSlider.create({ data: mainSlider })
	}

	change(id: string, mainSlider: MainSliderDto) {
		return this.prisma.mainSlider.update({
			where: {
				id,
			},
			data: mainSlider,
		})
	}

	markToDelete(id: string) {
		return this.prisma.mainSlider.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
