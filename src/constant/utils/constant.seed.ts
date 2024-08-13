import { PrismaClient } from '@prisma/client'

/* eslint-disable no-console */
export const constantsSeed = async (prisma: PrismaClient) => {
	await prisma.constant.create({
		data: {
			name: 'header_nav_links',
			language: 'ru',
			value: JSON.stringify([
				{ name: 'главная', link: '/' },
				{
					name: 'процедуры и цены',
					sublinks: [
						{
							name: 'для собак',
							link: '/dogs',
						},
						{
							name: 'для кошек',
							link: '/cats',
						},
					],
				},
				{ name: 'мастера', link: '/' },
				{ name: 'вакансии', link: '/' },
				{ name: 'контакты', link: '/' },
			]),
		},
	})

	await prisma.constant.create({
		data: {
			name: 'header_nav_links',
			language: 'en',
			value: JSON.stringify([
				{ name: 'home', link: '/' },
				{
					name: 'procedures and prices',
					sublinks: [
						{
							name: 'for dogs',
							link: '/dogs',
						},
						{
							name: 'for cats',
							link: '/cats',
						},
					],
				},
				{ name: 'masters', link: '/' },
				{ name: 'vacancies', link: '/' },
				{ name: 'contacts', link: '/' },
			]),
		},
	})
}
