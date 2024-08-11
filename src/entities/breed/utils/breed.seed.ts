import { PrismaClient } from '@prisma/client'

/* eslint-disable no-console */
export const breedSeed = async (prisma: PrismaClient) => {
	await prisma.breed.create({
		data: {
			name: 'Шпиц',
			language: 'ru',
		},
	})
	await prisma.breed.create({
		data: {
			name: 'Spitz',
			language: 'en',
		},
	})
	await prisma.breed.create({
		data: {
			name: 'Вест Хайленд Уайт Терьер',
			language: 'ru',
		},
	})
	await prisma.breed.create({
		data: {
			name: 'West Highland White Terrier',
			language: 'en',
		},
	})
}
