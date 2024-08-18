import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'

export const headerNavbarLinksSeed = async (prisma: PrismaClient) => {
	await prisma.headerNavbarLink.createMany({
		data: [
			{ language: LANGUAGES.ENGLISH, name: 'home', link: '/', order: 1 },
			{
				language: LANGUAGES.ENGLISH,
				name: 'procedure and prices',
				order: 2,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'masters',
				link: '/masters',
				order: 3,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'vacancies',
				link: '/vacancies',
				order: 4,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'contacts',
				link: '/contacts',
				order: 5,
			},
		],
	})

	let link = await prisma.headerNavbarLink.findFirst({
		where: {
			language: LANGUAGES.ENGLISH,
			name: 'procedure and prices',
		},
		select: {
			id: true,
		},
	})

	await prisma.headerNavbarLink.createMany({
		data: [
			{
				language: LANGUAGES.ENGLISH,
				name: 'for dogs',
				link: '/dogs',
				parentLinkId: link.id,
				order: 1,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'for cats',
				link: '/cats',
				parentLinkId: link.id,
				order: 2,
			},
		],
	})

	await prisma.headerNavbarLink.createMany({
		data: [
			{ language: LANGUAGES.RUSSIAN, name: 'главная', link: '/', order: 1 },
			{
				language: LANGUAGES.RUSSIAN,
				name: 'процедуры и цены',
				order: 2,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'мастера',
				link: '/masters',
				order: 3,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'вакансии',
				link: '/vacancies',
				order: 4,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'контакты',
				link: '/contacts',
				order: 5,
			},
		],
	})

	link = await prisma.headerNavbarLink.findFirst({
		where: {
			language: LANGUAGES.RUSSIAN,
			name: 'процедуры и цены',
		},
		select: {
			id: true,
		},
	})

	await prisma.headerNavbarLink.createMany({
		data: [
			{
				language: LANGUAGES.RUSSIAN,
				name: 'для собак',
				link: '/dogs',
				parentLinkId: link.id,
				order: 1,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'для кошек',
				link: '/cats',
				parentLinkId: link.id,
				order: 2,
			},
		],
	})
}
