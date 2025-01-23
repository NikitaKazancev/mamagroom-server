import { Injectable, Logger } from '@nestjs/common'
// import { file } from 'bun'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'
import { readdir, stat } from 'node:fs/promises'
import * as path from 'path'
import { type FileName, type FilePath } from './utils/file.constants'

@Injectable()
export class FileService {
	private readonly logger = new Logger(FileService.name)
	private nodeEnv: string

	constructor(private readonly configService: ConfigService) {
		this.nodeEnv = this.configService.get('NODE_ENV')
	}

	async findOne(filePath: FilePath, name: FileName) {
		try {
			const fullPath = this.fullFileUrl(filePath)

			const files = await readdir(fullPath)
			const matchingFiles = files.filter(file => file.startsWith(name))

			if (!matchingFiles.length) return null

			const filesWithStats = await Promise.all(
				matchingFiles.map(async file => {
					const filePath = path.join(fullPath, file)
					const stats = await stat(filePath)
					return { file, mtime: stats.mtime }
				})
			)

			filesWithStats.sort((a: any, b: any) => b.mtime - a.mtime)
			return `/static/${filePath}/${filesWithStats[0].file}`
		} catch (error) {
			this.logger.error(`Ошибка при чтении директории: ${error.message}`)
			return null
		}
	}

	fullFileUrl(...imagePath: string[]) {
		// from "dist" folder
		return path.join(__dirname, '..', '..', '..', 'static', ...imagePath)
	}

	async dataUrlOfImage(filePath: string) {
		const fileExtension = path.extname(filePath).slice(1).toLowerCase()
		const supportedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp']
		if (!supportedExtensions.includes(fileExtension)) {
			return ''
		}

		try {
			// Bun не виден в dev-режиме
			if (this.nodeEnv === 'development') {
				return await this.dataUrlOfImageDevelopment(filePath, fileExtension)
			} else {
				return await this.dataUrlOfImageProduction(filePath, fileExtension)
			}
		} catch (error) {
			this.logger.error(
				`Ошибка при обработке файла ${filePath}: ${error.message}`
			)
		}
	}

	private async dataUrlOfImageProduction(
		filePath: string,
		fileExtension: string
	) {
		const fileData = Bun.file(filePath)
		if (!(await fileData.exists())) return ''

		const data = Buffer.from(await fileData.arrayBuffer()).toString('base64')
		return `data:image/${fileExtension};base64,${data}`
	}

	private async dataUrlOfImageDevelopment(
		filePath: string,
		fileExtension: string
	) {
		if (!fs.existsSync(filePath)) return ''
		const fileData = fs.readFileSync(filePath)

		const data = fileData.toString('base64')
		return `data:image/${fileExtension};base64,${data}`
	}
}
