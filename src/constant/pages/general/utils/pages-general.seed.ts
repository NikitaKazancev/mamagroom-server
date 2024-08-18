import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'
import { PAGES_GENERAL } from '../pages-general.constants'

/* eslint-disable no-console */
export const pagesGeneralSeed = async (prisma: PrismaClient) => {
	await prisma.constant.create({
		data: {
			type: PAGES_GENERAL.type,
			name: PAGES_GENERAL.headerNavLinks,
			language: LANGUAGES.RUSSIAN,
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
				{ name: 'мастера', link: '/masters' },
				{ name: 'вакансии', link: '/vacancies' },
				{ name: 'контакты', link: '/contacts' },
			]),
		},
	})

	await prisma.constant.create({
		data: {
			type: PAGES_GENERAL.type,
			name: PAGES_GENERAL.headerNavLinks,
			language: LANGUAGES.ENGLISH,
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
				{ name: 'masters', link: '/masters' },
				{ name: 'vacancies', link: '/vacancies' },
				{ name: 'contacts', link: '/contacts' },
			]),
		},
	})
}
