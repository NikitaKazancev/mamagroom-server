import { PrismaClient } from '@prisma/client'

export const mainSliderSeed = async (prisma: PrismaClient) => {
	await prisma.mainSlider.createMany({
		data: [
			{
				order: 1,
				imageName: '1.png',
			},
			{
				order: 2,
				imageName: '2.png',
			},
			{
				order: 3,
				imageName: '3.png',
			},
			{
				order: 4,
				imageName: '4.png',
			},
			{
				order: 5,
				imageName: '5.png',
			},
			{
				order: 6,
				imageName: '6.png',
			},
			{
				order: 1,
				imageName: '1.png',
			},
			{
				order: 2,
				imageName: '2.png',
			},
			{
				order: 3,
				imageName: '3.png',
			},
			{
				order: 4,
				imageName: '4.png',
			},
			{
				order: 5,
				imageName: '5.png',
			},
			{
				order: 6,
				imageName: '6.png',
			},
		],
	})
}
