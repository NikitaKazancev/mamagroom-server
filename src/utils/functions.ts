export const prefix = (className: string, lang: string = '') => {
	if (lang) {
		return `(${lang}) [${className}]:`
	}

	return `[${className}]:`
}

export const fileExtension = (fileName: string) => {
	return fileName.split('.').pop()
}

export const toCamelCase = (str: string) => {
	return str.replace(/-./g, match => match[1].toUpperCase())
}
