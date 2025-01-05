import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MainSliderDto, RequiredMainSliderDto } from './main-slider.dto'

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

	create(mainSlider: RequiredMainSliderDto) {
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

	async changeWithOrder(id: string, mainSlider: RequiredMainSliderDto) {
		const mainSliderInDb = await this.prisma.mainSlider.count({
			where: {
				id: {
					not: id,
				},
				order: mainSlider.order,
			},
		})

		return await this.prisma.$transaction(async prisma => {
			if (mainSliderInDb) {
				await prisma.mainSlider.updateMany({
					where: {
						id: {
							not: id,
						},
						order: {
							gte: mainSlider.order,
						},
					},
					data: {
						order: {
							increment: 1,
						},
					},
				})
			}

			return await prisma.mainSlider.update({
				where: {
					id,
				},
				data: mainSlider,
			})
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
