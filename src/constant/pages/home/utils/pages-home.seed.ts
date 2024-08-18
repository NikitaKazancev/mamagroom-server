import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'
import { PAGES_HOME } from '../pages-home.constants'

/* eslint-disable no-console */
export const pagesHomeSeed = async (prisma: PrismaClient) => {
	await prisma.constant.createMany({
		data: [
			{
				type: PAGES_HOME.type,
				name: PAGES_HOME.mainTitle,
				language: LANGUAGES.RUSSIAN,
				value: 'заголовок',
			},
			{
				type: PAGES_HOME.type,
				name: PAGES_HOME.mainDescription,
				language: LANGUAGES.RUSSIAN,
				value: 'описание',
			},
			{
				type: PAGES_HOME.type,
				name: PAGES_HOME.mainTitle,
				language: LANGUAGES.ENGLISH,
				value: 'title',
			},
			{
				type: PAGES_HOME.type,
				name: PAGES_HOME.mainDescription,
				language: LANGUAGES.ENGLISH,
				value: 'description',
			},
		],
	})
}
