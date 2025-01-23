/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { FileService } from 'src/file/file.service'
import {
	type AIRequestBody,
	type AIResponse,
	type IServiceAI,
	type OpenAIModel,
} from './ai.types'

@Injectable()
export class OpenAIService implements IServiceAI {
	private readonly logger = new Logger(OpenAIService.name)

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

	models: OpenAIModel[] = ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo']
	isCorrectAIModel(model: string): model is OpenAIModel {
		return this.models.includes(model as OpenAIModel)
	}

	async request({
		systemText,
		text,
		imageUrl,
		model,
	}: AIRequestBody<OpenAIModel>): Promise<AIResponse> {
		let content:
			| string
			| (
					| { type: 'text'; text: string }
					| { type: 'image_url'; image_url: { url: string } }
			  )[]
		let modelType: OpenAIModel

		if (imageUrl) {
			const dataUrl = await this.fileService.dataUrlOfImage(imageUrl)
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
			} else if (!text) {
				return { data: undefined, model: model || 'gpt-4o' }
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
			.then(response => {
				return {
					data: response.data?.choices[0]?.message?.content,
					model: modelType,
				}
			})
			.catch(error => {
				this.logger.error(`Ошибка при запросе: ${error.message}`)
				if (error.response) {
					this.logger.error(`Ответ от сервера: ${error.response.data}`)
				}

				return {
					data: undefined,
					model: modelType,
				}
			})
	}
}
