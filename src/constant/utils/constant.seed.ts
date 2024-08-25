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
				name: CONSTANT_NAMES.proceduresForDogsTitle,
				language: LANGUAGES.RUSSIAN,
				value: 'Процедуры для собак',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForDogsDescription,
				language: LANGUAGES.RUSSIAN,
				value: 'Груминг собак включает стрижку, уход за шерстью, купание и обработку когтей, что помогает поддерживать здоровье и внешний вид животного. Он выделяется тем, что улучшает не только внешний вид, но и самочувствие собаки, предотвращая кожные заболевания и снижая линьку.',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForCatsTitle,
				language: LANGUAGES.RUSSIAN,
				value: 'Процедуры для кошек',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForCatsDescription,
				language: LANGUAGES.RUSSIAN,
				value: 'Груминг кошек включает регулярное расчесывание, купание и уход за когтями, что помогает предотвратить образование колтунов и уменьшить выпадение шерсти. Особенность груминга кошек в том, что он минимизирует стресс для животного и способствует его гигиене, особенно у длинношерстных пород.',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.valuesTitle,
				language: LANGUAGES.RUSSIAN,
				value: 'наши ценности',
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
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForDogsTitle,
				language: LANGUAGES.ENGLISH,
				value: 'Procedures for dogs',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForDogsDescription,
				language: LANGUAGES.ENGLISH,
				value: 'Dog grooming includes haircuts, hair care, bathing and nail treatment, which helps maintain the health and appearance of the animal. It stands out because it improves not only the appearance but also the well-being of the dog, preventing skin diseases and reducing shedding.',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForCatsTitle,
				language: LANGUAGES.ENGLISH,
				value: 'Procedures for cats',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.proceduresForCatsDescription,
				language: LANGUAGES.ENGLISH,
				value: 'Cat grooming involves regular brushing, bathing, and nail care, which helps prevent matting and reduce hair loss. The beauty of cat grooming is that it minimizes stress for the animal and promotes hygiene, especially for long-haired breeds.',
			},
			{
				type: CONSTANT_TYPES.homePage,
				name: CONSTANT_NAMES.valuesTitle,
				language: LANGUAGES.ENGLISH,
				value: 'our values',
			},
		],
	})
}
