import { v4 as uuidv4 } from 'uuid'

export type Language = 'ru' | 'en'

export const LANGUAGES_LIST: Language[] = ['ru', 'en']

export const LANGUAGES = {
	RUSSIAN: 'ru',
	ENGLISH: 'en',
}

export const IMAGE_NOT_FOUND_URL = 'image-not-found.png'

export const KAFKA_UID = uuidv4()
