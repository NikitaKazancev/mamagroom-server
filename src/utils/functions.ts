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

export const getMemStart = () => {
	return 0
	// return process.memoryUsage().heapUsed
}
export const logUsedMemory = async (memStart: number, prefix?: string) => {
	// await new Promise(res => setTimeout(res, 100))
	// const memEnd = process.memoryUsage().heapUsed
	// const memoryUsedInMB = (memEnd - memStart) / 1024 / 1024
	// console.log(`[${prefix}] Memory used: ${memoryUsedInMB.toFixed(2)} MB`)
}
