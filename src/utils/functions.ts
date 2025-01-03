import axios from 'axios'

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

export async function fetchImageToBase64(url) {
	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' })
		const buffer = Buffer.from(response.data, 'binary')
		return `data:image/jpeg;base64,${buffer.toString('base64')}`
	} catch (error) {
		console.error('Error fetching the image:', error.message)
		throw error
	}
}
