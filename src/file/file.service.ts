import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FileService {
	constructor() {}

	dataUrlOfImage(filePath: string) {
		try {
			if (!fs.existsSync(filePath)) {
				return ''
			}

			const fileBuffer = fs.readFileSync(filePath)
			const fileExtension = path.extname(filePath).slice(1).toLowerCase()
			const supportedExtensions = [
				'png',
				'jpg',
				'jpeg',
				'gif',
				'bmp',
				'webp',
			]

			if (!supportedExtensions.includes(fileExtension)) {
				return ''
			}

			return `data:image/${fileExtension};base64,${fileBuffer.toString('base64')}`
		} catch (error) {
			console.error(`Ошибка при обработке файла ${filePath}:`, error.message)
		}
	}
}
