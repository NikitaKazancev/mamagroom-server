import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'
import { CONSTANT_NAMES, CONSTANT_TYPES } from './constant.types'

/* eslint-disable no-console */
export const constantSeed = async (prisma: PrismaClient) => {
	await prisma.constant.createMany({
		data: [
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.mainTitle,
				language: LANGUAGES.RUSSIAN,
				value: 'заголовок',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.mainDescription,
				language: LANGUAGES.RUSSIAN,
				value: 'описание',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.aboutUsTitle,
				language: LANGUAGES.RUSSIAN,
				value: 'о нас',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.aboutUsDescription,
				language: LANGUAGES.RUSSIAN,
				value: 'В рамках спецификации современных стандартов, интерактивные прототипы освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, объективно рассмотрены соответствующими инстанциями. Не следует, однако, забывать, что',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.mainTitle,
				language: LANGUAGES.ENGLISH,
				value: 'title',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.mainDescription,
				language: LANGUAGES.ENGLISH,
				value: 'description',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.aboutUsTitle,
				language: LANGUAGES.ENGLISH,
				value: 'about us',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.aboutUsDescription,
				language: LANGUAGES.ENGLISH,
				value: 'Within the framework of the specification of modern standards, interactive prototypes highlight extremely interesting features of the picture as a whole, but the specific conclusions are, of course, objectively considered by the relevant authorities. It should not be forgotten, however, that',
			},
		],
	})

	// TODO: add procedures
}
