import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'

export const vacancySeed = async (prisma: PrismaClient) => {
	await prisma.vacancy.createMany({
		data: [
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Администратор',
				description: 'Делать всякие крутые штуки',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Грумер',
				description:
					'Стричь собак и любить их (но кошек любить не обязательно)',
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Стажер',
				description:
					'Просто быть моим другом, чтобы мне было с кем пообщаться',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Administrator',
				description: 'Do some cool things',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Groomer',
				description:
					'Stretching dogs and loving them (but not loving cats is not mandatory)',
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Intern',
				description: 'Just be my friend, so I can talk to someone',
			},
		],
		skipDuplicates: true,
	})
}
