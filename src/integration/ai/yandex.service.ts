/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

export type YandexAIModel =
	| 'yandexgpt-lite'
	| 'yandexgpt'
	| 'yandexgpt-32k'
	| 'llama-lite'
	| 'llama'

@Injectable()
export class YandexService {
	data: {
		apiUrl: string
		folderId: string
		iAmToken: string
	}

	constructor(private readonly configService: ConfigService) {
		this.data = {
			apiUrl:
				'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
			folderId: configService.get('YANDEX_FOLDER_ID'),
			iAmToken: configService.get('YANDEX_IAM_TOKEN'),
		}
	}

	models: YandexAIModel[] = [
		'yandexgpt-lite',
		'yandexgpt',
		'yandexgpt-32k',
		'llama-lite',
		'llama',
	]
	isYandexAIModel(model: string): model is YandexAIModel {
		return this.models.includes(model as YandexAIModel)
	}

	async request({
		systemText,
		text,
		model,
	}: {
		systemText: string
		text: string
		model?: YandexAIModel
	}): Promise<string | undefined> {
		const modelType: YandexAIModel = model || 'yandexgpt'

		const requestData = {
			modelUri: `gpt://${this.data.folderId}/${modelType}`,
			completionOptions: {
				stream: false,
				temperature: 0,
				maxTokens: 2000,
			},
			messages: [
				{
					role: 'system',
					text: systemText,
				},
				{
					role: 'user',
					text,
				},
			],
		}

		const config = {
			method: 'post',
			url: this.data.apiUrl,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.data.iAmToken}`,
			},
			data: requestData,
			maxBodyLength: Infinity,
		}

		return await axios(config)
			.then(
				response => response.data?.result?.alternatives?.[0]?.message?.text
			)
			.catch(error => {
				console.error('Ошибка при запросе:', error.message)
				if (error.response) {
					console.error('Ответ от сервера:', error.response.data)
				}

				return undefined
			})
	}
}
