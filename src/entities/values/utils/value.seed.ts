import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'

export const valuesSeed = async (prisma: PrismaClient) => {
	await prisma.value.createMany({
		data: [
			{
				language: LANGUAGES.RUSSIAN,
				title: 'Забота о здоровье',
				description:
					'Мы ставим здоровье и благополучие каждого питомца на первое место',
				order: 1,
				imageName: '1.png',
			},
			{
				language: LANGUAGES.RUSSIAN,
				title: 'Качество услуг',
				description:
					'Мы гарантируем высокие стандарты в каждой процедуре груминга',
				order: 2,
				imageName: '2.png',
			},
			{
				language: LANGUAGES.RUSSIAN,
				title: 'Комфорт животных',
				description:
					'Мы создаем безопасную и комфортную среду для всех питомцев',
				order: 3,
				imageName: '3.png',
			},
			{
				language: LANGUAGES.RUSSIAN,
				title: 'Профессионализм',
				description:
					'Наша команда постоянно совершенствует свои навыки и знания',
				order: 4,
				imageName: '4.png',
			},
			{
				language: LANGUAGES.RUSSIAN,
				title: 'Индивидуальный подход',
				description:
					'Мы учитываем уникальные потребности каждого клиента и его питомца',
				order: 5,
				imageName: '5.png',
			},
			{
				language: LANGUAGES.RUSSIAN,
				title: 'Этика и уважение',
				description:
					'Мы относимся к животным с любовью, терпением и уважением',
				order: 6,
				imageName: '6.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				title: 'Health Care',
				description: 'We put the health and well-being of each pet first',
				order: 1,
				imageName: '1.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				title: 'Quality of Service',
				description:
					'We guarantee high standards in every grooming procedure',
				order: 2,
				imageName: '2.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				title: 'Pet Comfort',
				description:
					'We create a safe and comfortable environment for all pets',
				order: 3,
				imageName: '3.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				title: 'Professionalism',
				description:
					'Our team is constantly improving their skills and knowledge',
				order: 4,
				imageName: '4.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				title: 'Individual approach',
				description:
					'We take into account the unique needs of each client and their pet',
				order: 5,
				imageName: '5.png',
			},
			{
				language: LANGUAGES.ENGLISH,
				title: 'Ethics and Respect',
				description: 'We treat animals with love, patience and respect',
				order: 6,
				imageName: '6.png',
			},
		],
	})
}
