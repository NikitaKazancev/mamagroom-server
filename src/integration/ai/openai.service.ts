/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { fetchImageToBase64 } from 'src/utils/functions'

export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-3.5-turbo'

@Injectable()
export class OpenAIService {
	data: {
		apiUrl: string
		apiKey: string
		proxyAgent: HttpsProxyAgent<string>
	}

	constructor(private readonly configService: ConfigService) {
		const proxyHost: string = configService.get('PROXY_HOST')
		const proxyPort: number = configService.get('PROXY_PORT')
		const proxyUsername: string = configService.get('PROXY_USERNAME')
		const proxyPassword: string = configService.get('PROXY_PASSWORD')
		const proxyUrl = `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`

		this.data = {
			apiKey: configService.get('OPENAI_API_KEY'),
			apiUrl: 'https://api.openai.com/v1/chat/completions',
			proxyAgent: new HttpsProxyAgent(proxyUrl),
		}
	}

	models: OpenAIModel[] = ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo']
	isOpenAIModel(model: string): model is OpenAIModel {
		return this.models.includes(model as OpenAIModel)
	}

	async request({
		text,
		imageUrl,
		model,
	}: {
		text: string
		imageUrl?: string
		model?: OpenAIModel
	}) {
		let content:
			| string
			| (
					| { type: 'text'; text: string }
					| { type: 'image_url'; image_url: { url: string } }
			  )[]
		let modelType: OpenAIModel

		if (imageUrl) {
			content = [
				{ type: 'text', text },
				{
					type: 'image_url',
					image_url: {
						url: await fetchImageToBase64(imageUrl),
					},
				},
			]

			modelType = 'gpt-4o'
		} else {
			content = text
			modelType = model || 'gpt-4o'
		}

		const requestData = {
			model: modelType,
			messages: [{ role: 'user', content }],
		}

		try {
			const response = await axios.post(this.data.apiUrl, requestData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.data.apiKey}`,
				},
				httpsAgent: this.data.proxyAgent,
			})

			const messageContent = response.data.choices[0]?.message?.content
			if (messageContent) {
				return messageContent
			}
		} catch (error) {
			console.error('Ошибка при запросе:', error.message)
			if (error.response) {
				console.error('Ответ от сервера:', error.response.data)
			}
		}

		return undefined
	}
}
