/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import net from 'net'
import { BreedService } from 'src/entities/breed/breed.service'
import { ProcedureService } from 'src/entities/procedure/procedure.service'
import tls from 'tls'
import { URL } from 'url'

@Injectable()
export class IntegrationService {
	openai: {
		proxyHost: string
		proxyPort: number
		proxyUsername: string
		proxyPassword: string
		apiUrl: URL
		apiKey: string
		response: string
	}

	constructor(
		private readonly breedService: BreedService,
		private readonly procedureService: ProcedureService,
		private readonly configService: ConfigService
	) {
		this.openai = {
			apiKey: configService.get('OPENAI_API_KEY'),
			apiUrl: new URL('https://api.openai.com/v1/chat/completions'),
			proxyHost: configService.get('PROXY_HOST'),
			proxyPort: Number(configService.get('PROXY_PORT')),
			proxyUsername: configService.get('PROXY_USERNAME'),
			proxyPassword: configService.get('PROXY_PASSWORD'),
			response: undefined,
		}
	}

	async proceduresByUserDescription(userDescription: string) {
		const breedsInDb: { name: string }[] = await this.breedService.findMany(
			{ isDeleted: false, language: 'ru' },
			{ name: true }
		)

		const breeds = breedsInDb.map(breed => breed.name)

		let requestText = `
		Ты эксперт в области кинологии и собаководства.
		Прочти описание пользователя и выдели из него породу собаки:

		"""${userDescription}"""


		В качестве ответа отправь ТОЛЬКО НОМЕР ПОРОДЫ:
		${breeds.join('\n')}


		Если подходящей породы не оказалось, отправь номер той породы, которая ближе всего подходит по описанию пользователя.
		`

		const response = await this.requestToOpenAI(requestText)
		if (!response) {
			return []
		}

		const detectedBreedIndex = Number(response) - 1
		if (detectedBreedIndex < 0 || detectedBreedIndex >= breeds.length) {
			return []
		}

		const breed = breeds[detectedBreedIndex]

		const proceduresInDb = await this.procedureService.findMany(
			{ isDeleted: false, language: 'ru' },
			{ name: true }
		)

		requestText = `
		Ты эксперт в области кинологии и собаководства.
		Прочти описание пользователя и предложи 2-3 подходящие услуги для породы ${breed}:

		"""${userDescription}"""


		В качестве ответа отправь ТОЛЬКО НОМЕРА УСЛУГ:
		${breeds.join('\n')}


		Если подходящей породы не оказалось, отправь номер той породы, которая ближе всего подходит по описанию пользователя.
		`
	}

	async requestToOpenAI(text: string) {
		this.openai.response = undefined

		return await new Promise<string | undefined>((resolve, reject) => {
			this.requestToOpenAIWithProxy(text)

			let time = 0
			const interval = setInterval(() => {
				if (this.openai.response) {
					clearInterval(interval)
					resolve(this.openai.response)
				}

				time += 200
				if (time >= 10000) {
					clearInterval(interval)
					reject(undefined)
				}
			}, 200)
		})
	}

	requestToOpenAIWithProxy(text: string) {
		const proxyRequest = net.connect(
			this.openai.proxyPort,
			this.openai.proxyHost,
			() => {
				proxyRequest.write(
					`CONNECT ${this.openai.apiUrl.hostname}:443 HTTP/1.1\r\n` +
						`Host: ${this.openai.apiUrl.hostname}\r\n` +
						`Proxy-Authorization: Basic ${Buffer.from(this.openai.proxyUsername + ':' + this.openai.proxyPassword).toString('base64')}\r\n` +
						`\r\n`
				)
			}
		)

		const content = JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text,
						},
					],
				},
			],
		})

		proxyRequest.on('data', chunk => {
			if (chunk.toString().includes('200 Connection established')) {
				const tlsSocket = tls.connect(
					{
						host: this.openai.apiUrl.hostname,
						socket: proxyRequest,
						servername: this.openai.apiUrl.hostname,
					},
					() => {
						tlsSocket.write(
							`POST ${this.openai.apiUrl.pathname} HTTP/1.1\r\n` +
								`Host: ${this.openai.apiUrl.hostname}\r\n` +
								`Authorization: Bearer ${this.openai.apiKey}\r\n` +
								`Content-Type: application/json\r\n` +
								`Content-Length: ${Buffer.byteLength(content, 'utf8')}\r\n` +
								`\r\n` +
								content
						)
					}
				)

				tlsSocket.on('data', data => {
					console.log(data.toString())
					this.openai.response = data.toString()
				})

				tlsSocket.on('error', err => {
					console.error('Ошибка в HTTPS-соединении:', err)
				})
			} else {
				console.error('Ошибка при установке туннеля через прокси')
			}
		})

		proxyRequest.on('error', err => {
			console.error('Ошибка подключения к прокси:', err)
		})
	}
}
