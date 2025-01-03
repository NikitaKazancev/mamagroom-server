/* eslint-disable no-console */
const axios = require('axios')
const net = require('net')
const tls = require('tls')
const { URL } = require('url')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const proxyHost = ''
const proxyPort = 0
const proxyUsername = ''
const proxyPassword = ''
const apiUrl = 'https://api.openai.com/v1/chat/completions'
const parsedUrl = new URL(apiUrl)
const apiKey = ''

async function fetchImageToBase64(url) {
	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' })
		const buffer = Buffer.from(response.data, 'binary')
		return `data:image/jpeg;base64,${buffer.toString('base64')}`
	} catch (error) {
		console.error('Error fetching the image:', error.message)
		throw error
	}
}

;(async function () {
	const content = JSON.stringify({
		model: 'gpt-4o',
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: 'Привет. Как дела?',
					},
					// {
					// 	type: 'image_url',
					// 	image_url: {
					// 		url: await fetchImageToBase64(
					// 			'https://mamagroom.ru/api/static/pages/home/main-bg.jpg'
					// 		),
					// 	},
					// },
				],
			},
		],
		// max_tokens: 300,
	})

	const proxyRequest = net.connect(proxyPort, proxyHost, () => {
		proxyRequest.write(
			`CONNECT ${parsedUrl.hostname}:443 HTTP/1.1\r\n` +
				`Host: ${parsedUrl.hostname}\r\n` +
				`Proxy-Authorization: Basic ${Buffer.from(proxyUsername + ':' + proxyPassword).toString('base64')}\r\n` +
				`\r\n`
		)
	})

	proxyRequest.on('data', chunk => {
		if (chunk.toString().includes('200 Connection established')) {
			const tlsSocket = tls.connect(
				{
					host: parsedUrl.hostname,
					socket: proxyRequest,
					servername: parsedUrl.hostname,
				},
				() => {
					tlsSocket.write(
						`POST ${parsedUrl.pathname} HTTP/1.1\r\n` +
							`Host: ${parsedUrl.hostname}\r\n` +
							`Authorization: Bearer ${apiKey}\r\n` +
							`Content-Type: application/json\r\n` +
							`Content-Length: ${Buffer.byteLength(content, 'utf8')}\r\n` +
							`\r\n` +
							content
					)
				}
			)

			tlsSocket.on('data', data => {
				console.log(data.toString())
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
})()
