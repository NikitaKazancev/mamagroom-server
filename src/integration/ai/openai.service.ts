/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { FileService } from 'src/file/file.service'
import { IServiceAI, OpenAIModel } from './ai.types'

@Injectable()
export class OpenAIService implements IServiceAI {
	data: {
		apiUrl: string
		apiKey: string
		proxyAgent: HttpsProxyAgent<string>
	}

	constructor(
		private readonly configService: ConfigService,
		private readonly fileService: FileService
	) {
		const proxyHost: string = configService.get('PROXY_HOST')
		const proxyPort: number = configService.get('PROXY_PORT')
		const proxyUsername: string = configService.get('PROXY_USERNAME')
		const proxyPassword: string = configService.get('PROXY_PASSWORD')
		const proxyUrl = `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`

		this.data = {
			apiUrl: 'https://api.openai.com/v1/chat/completions',
			apiKey: configService.get('OPENAI_API_KEY'),
			proxyAgent: new HttpsProxyAgent(proxyUrl),
		}
	}

	models: OpenAIModel[] = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo']
	isCorrectAIModel(model: string): model is OpenAIModel {
		return this.models.includes(model as OpenAIModel)
	}

	async request({
		systemText,
		text,
		imageUrl,
		model,
	}: {
		systemText: string
		text: string
		imageUrl?: string
		model?: OpenAIModel
	}): Promise<string | undefined> {
		let content:
			| string
			| (
					| { type: 'text'; text: string }
					| { type: 'image_url'; image_url: { url: string } }
			  )[]
		let modelType: OpenAIModel

		if (imageUrl) {
			const dataUrl = this.fileService.dataUrlOfImage(imageUrl)
			if (dataUrl) {
				content = [
					{ type: 'text', text },
					{
						type: 'image_url',
						image_url: {
							url: dataUrl,
						},
					},
				]

				modelType = 'gpt-4o'
			} else {
				content = text
				modelType = model || 'gpt-4o'
			}
		} else {
			content = text
			modelType = model || 'gpt-4o'
		}

		const config = {
			method: 'post',
			url: this.data.apiUrl,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.data.apiKey}`,
			},
			data: {
				model: modelType,
				messages: [
					{ role: 'system', content: systemText },
					{ role: 'user', content },
				],
			},
			httpsAgent: this.data.proxyAgent,
			maxBodyLength: Infinity,
		}

		return await axios(config)
			.then(response => response.data?.choices[0]?.message?.content)
			.catch(error => {
				console.error('Ошибка при запросе:', error.message)
				if (error.response) {
					console.error('Ответ от сервера:', error.response.data)
				}

				return undefined
			})
	}
}
