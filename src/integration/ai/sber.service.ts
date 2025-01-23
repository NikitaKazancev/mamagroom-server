/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import * as FormData from 'form-data'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import {
	type AIRequestBody,
	type AIResponse,
	type IServiceAI,
	type SberAIModel,
} from './ai.types'

@Injectable()
export class SberService implements IServiceAI {
	private readonly logger = new Logger(SberService.name)

	data: {
		authUrl: string
		filesUrl: string
		apiUrl: string
		authKey: string
	}

	constructor(private readonly configService: ConfigService) {
		this.data = {
			authUrl: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
			filesUrl: 'https://gigachat.devices.sberbank.ru/api/v1/files',
			apiUrl: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
			authKey: configService.get('SBER_AUTH_KEY'),
		}
	}

	models: SberAIModel[] = ['GigaChat', 'GigaChat-Pro', 'GigaChat-Max']
	isCorrectAIModel(model: string): model is SberAIModel {
		return this.models.includes(model as SberAIModel)
	}

	async request({
		systemText,
		text,
		imageUrl,
		model,
	}: AIRequestBody<SberAIModel>): Promise<AIResponse> {
		const accessToken = await this.fetchAccessToken()
		if (!accessToken) {
			return {
				model,
				data: undefined,
			}
		}

		let imageId: string
		if (imageUrl) {
			imageId = await this.sendImage(accessToken, imageUrl)
			if (!imageId) {
				return {
					model,
					data: undefined,
				}
			}
		}

		const data = await this.sendQuestionRequest({
			systemText,
			text,
			imageId,
			model,
			accessToken,
		})

		return {
			model,
			data,
		}
	}

	private async fetchAccessToken(): Promise<string | undefined> {
		const config = {
			method: 'post',
			url: this.data.authUrl,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
				RqUID: uuidv4(),
				Authorization: `Basic ${this.data.authKey}`,
			},
			data: 'scope=GIGACHAT_API_PERS',
			maxBodyLength: Infinity,
		}

		return await axios(config)
			.then(response => response.data?.access_token)
			.catch(error => {
				this.logger.error(`Ошибка при получении токена: ${error.message}`)
				return undefined
			})
	}

	private async sendImage(
		accessToken: string,
		imageUrl: string
	): Promise<string | undefined> {
		const data = new FormData()
		data.append('file', fs.createReadStream(imageUrl))
		data.append('purpose', 'general')

		const config = {
			method: 'post',
			url: this.data.filesUrl,
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
				...data.getHeaders(),
			},
			data,
			maxBodyLength: Infinity,
		}

		return await axios(config)
			.then(response => response.data?.id)
			.catch(error => {
				this.logger.error(`Ошибка при отправке картинки: ${error.message}`)
				return undefined
			})
	}

	private async sendQuestionRequest({
		systemText,
		text,
		imageId,
		model,
		accessToken,
	}: {
		systemText: string
		text: string
		imageId?: string
		model?: SberAIModel
		accessToken: string
	}): Promise<string | undefined> {
		const message: {
			role: string
			content: string
			attachements?: string[]
		} = {
			role: 'user',
			content: text,
		}

		if (imageId) {
			message.attachements = [imageId]
		}

		const modelType: SberAIModel = model || 'GigaChat'

		const requestData = {
			model: modelType,
			messages: [
				{
					role: 'system',
					content: systemText,
				},
				message,
			],
			stream: false,
			update_interval: 0,
		}

		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: this.data.apiUrl,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: requestData,
		}

		return await axios(config)
			.then(response => response.data?.choices[0]?.message?.content)
			.catch(error => {
				this.logger.error(`Ошибка при запросе: ${error.message}`)
				if (error.response) {
					this.logger.error(`Ответ от сервера: ${error.response.data}`)
				}

				return undefined
			})
	}
}
