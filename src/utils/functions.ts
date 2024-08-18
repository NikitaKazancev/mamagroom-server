export const prefix = (className: string, lang: string = '') => {
	if (lang) {
		return `(${lang}) [${className}]:`
	}

	return `[${className}]:`
}
