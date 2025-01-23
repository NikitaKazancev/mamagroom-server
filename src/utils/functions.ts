export const prefix = (className: string, lang: string = '') => {
	if (lang) {
		return `(${lang}) [${className}]:`
	}

	return `[${className}]:`
}

export const fileExtension = (fileName: string) => {
	return fileName.split('.').pop()
}

export const toBoolean = (value: unknown): boolean => {
	if (value === 'false') return false
	return Boolean(value)
}
