/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import {
	type AIRequestBody,
	type AIResponse,
	type IServiceAI,
	type YandexAIModel,
} from './ai.types'

@Injectable()
export class YandexService implements IServiceAI {
	private readonly logger = new Logger(YandexService.name)

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
	isCorrectAIModel(model: string): model is YandexAIModel {
		return this.models.includes(model as YandexAIModel)
	}

	async request({
		systemText,
		text,
		model,
	}: AIRequestBody<YandexAIModel>): Promise<AIResponse> {
		const modelType: YandexAIModel = model || 'yandexgpt'

		const requestData = {
			modelUri: `gpt://${this.data.folderId}/${modelType}`,
			completionOptions: {
				stream: false,
				temperature: 0.3,
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
			.then(response => {
				return {
					model: modelType,
					data: response.data?.result?.alternatives?.[0]?.message?.text,
				}
			})
			.catch(error => {
				this.logger.error(`Ошибка при запросе: ${error.message}`)
				if (error.response) {
					this.logger.error(`Ответ от сервера: ${error.response.data}`)
				}

				return {
					model: modelType,
					data: undefined,
				}
			})
	}
}
