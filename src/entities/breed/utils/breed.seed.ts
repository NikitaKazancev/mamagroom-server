import { BreedType, PrismaClient } from '@prisma/client'
import { LANGUAGES } from 'src/utils/constants'

export const breedSeed = async (prisma: PrismaClient) => {
	await prisma.breed.createMany({
		data: [
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Чихуахуа',
				type: BreedType.smallDog,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Йоркширский терьер',
				type: BreedType.smallDog,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Бордер-колли',
				type: BreedType.mediumDog,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Бигль',
				type: BreedType.mediumDog,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Немецкий дог',
				type: BreedType.bigDog,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Алабай',
				type: BreedType.bigDog,
			},
			{
				language: LANGUAGES.RUSSIAN,
				name: 'Кошка',
				type: BreedType.cat,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Chihuahua',
				type: BreedType.smallDog,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Yorkshire terrier',
				type: BreedType.smallDog,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Border collie',
				type: BreedType.mediumDog,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Bichon Frisé',
				type: BreedType.smallDog,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'German Shepherd',
				type: BreedType.bigDog,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Alaskan Malamute',
				type: BreedType.bigDog,
			},
			{
				language: LANGUAGES.ENGLISH,
				name: 'Cat',
				type: BreedType.cat,
			},
		],
		skipDuplicates: true,
	})
}
