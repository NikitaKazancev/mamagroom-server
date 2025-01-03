import axios from 'axios'
import net from 'net'
import tls from 'tls'
import { URL } from 'url'

// Прокси-сервер и его данные
const proxyHost = '190.111.161.63'
const proxyPort = 9451
const proxyUsername = 'MRCJrj'
const proxyPassword = 'ncNaYB'

// API URL, к которому нужно подключиться
const apiUrl = 'https://api.openai.com/v1/chat/completions'
const parsedUrl = new URL(apiUrl)

// API-ключ
const apiKey =
	'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'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

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
						text: 'Ты эксперт в области кинологии и собаководства. Назови мне необычную породу.',
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

	// Создаем HTTP туннель через прокси с помощью команды CONNECT
	const proxyRequest = net.connect(proxyPort, proxyHost, () => {
		// Команда CONNECT для прокси, указываем целевой хост и порт
		proxyRequest.write(
			`CONNECT ${parsedUrl.hostname}:443 HTTP/1.1\r\n` +
				`Host: ${parsedUrl.hostname}\r\n` +
				`Proxy-Authorization: Basic ${Buffer.from(proxyUsername + ':' + proxyPassword).toString('base64')}\r\n` +
				`\r\n`
		)
	})

	// Получаем ответ от прокси и устанавливаем HTTPS-соединение
	proxyRequest.on('data', chunk => {
		// Проверяем успешное соединение (HTTP/1.1 200 Connection established)
		if (chunk.toString().includes('200 Connection established')) {
			// Устанавливаем HTTPS-соединение через прокси-туннель
			const tlsSocket = tls.connect(
				{
					host: parsedUrl.hostname,
					socket: proxyRequest,
					servername: parsedUrl.hostname, // для проверки SNI
				},
				() => {
					// Отправляем POST-запрос через туннель
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

			// Получаем ответ от API
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
