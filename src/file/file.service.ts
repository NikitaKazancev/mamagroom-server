import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { FileName, FilePath } from './utils/file.constants'

@Injectable()
export class FileService {
	constructor() {}

	findOne(filePath: FilePath, name: FileName) {
		try {
			const fullPath = this.fullFileUrl(filePath)

			const files = fs.readdirSync(fullPath)
			const matchingFiles = files.filter(file => file.startsWith(name))

			if (!matchingFiles.length) return null

			const filesWithStats = matchingFiles.map(file => {
				const filePath = path.join(fullPath, file)
				const stats = fs.statSync(filePath)
				return { file, mtime: stats.mtime }
			})

			filesWithStats.sort((a: any, b: any) => b.mtime - a.mtime)
			return `/static/${filePath}/${filesWithStats[0].file}`
		} catch (error) {
			console.error(`Ошибка при чтении директории: ${error.message}`)
			return null
		}
	}

	fullFileUrl(...imagePath: string[]) {
		// from "dist" folder
		return path.join(__dirname, '..', '..', '..', 'static', ...imagePath)
	}

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
