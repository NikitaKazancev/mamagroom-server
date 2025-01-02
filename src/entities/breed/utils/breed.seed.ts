import { PrismaClient } from '@prisma/client'

export const breedSeed = async (prisma: PrismaClient) => {
	await prisma.breed.createMany({
		data: [
			{
				name: 'Шпиц',
				language: 'ru',
			},
			{
				name: 'Spitz',
				language: 'en',
			},
			{
				name: 'Вест Хайленд Уайт Терьер',
				language: 'ru',
			},
			{
				name: 'West Highland White Terrier',
				language: 'en',
			},
		],
		skipDuplicates: true,
	})
}
