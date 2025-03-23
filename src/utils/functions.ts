import { ConfigService } from '@nestjs/config'

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

export const isDev = (configService: ConfigService) =>
	configService.get('NODE_ENV') === 'development' ||
	configService.get('NODE_ENV') === 'test'
