/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

export type SberAIModel = 'GigaChat' | 'GigaChat-Pro' | 'GigaChat-Max'

@Injectable()
export class SberService {
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
	isSberAIModel(model: string): model is SberAIModel {
		return this.models.includes(model as SberAIModel)
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
		model?: SberAIModel
	}) {
		const accessToken = await this.fetchAccessToken()
		if (!accessToken) {
			return undefined
		}

		let imageId: string
		if (imageUrl) {
			imageId = await this.sendImage(accessToken, imageUrl)
			if (!imageId) {
				return undefined
			}
		}

		return await this.sendQuestionRequest({
			systemText,
			text,
			imageId,
			model,
			accessToken,
		})
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
				console.error(error)
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
				console.log(error)
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
				console.log(error)
				return undefined
			})
	}
}
