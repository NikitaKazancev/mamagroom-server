import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'

export const masterSeed = async (prisma: PrismaClient) => {
	await prisma.master.createMany({
		data: [
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Мария Казанцева',
				description: 'Самая лучшая',
				imageName: '1.png',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Катя',
				description: 'Лучшая',
				imageName: '2.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Maria Kazantseva',
				description: 'The bestest',
				imageName: '1.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Katerina',
				description: 'The best',
				imageName: '2.png',
			},
		],
		skipDuplicates: true,
	})
}
