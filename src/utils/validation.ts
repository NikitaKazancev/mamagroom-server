import { Language, LANGUAGES_LIST } from './constants'
import { badRequest } from './errors'

export const validateLanguage = (lang: Language) => {
	if (!lang || !LANGUAGES_LIST.includes(lang)) {
		badRequest(`Invalid language ${lang}`, undefined, lang)
	}
}
