/* eslint-disable no-console */
const axios = require('axios')
const { HttpsProxyAgent } = require('https-proxy-agent')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const PROXY_HOST = ''
const PROXY_PORT = 0
const PROXY_USERNAME = ''
const PROXY_PASSWORD = ''
const proxyUrl = `http://${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`
const agent = new HttpsProxyAgent(proxyUrl)
const apiKey = ''
const apiUrl = 'https://api.openai.com/v1/chat/completions'

const requestData = {
	model: 'gpt-4o',
	messages: [{ role: 'user', content: 'Привет! Как дела?' }],
	max_tokens: 100,
}

;(async () => {
	try {
		const response = await axios.post(apiUrl, requestData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			httpsAgent: agent,
		})

		console.log('Ответ от OpenAI:', JSON.stringify(response.data, null, 2))
	} catch (error) {
		console.error('Ошибка при запросе:', error.message)
		if (error.response) {
			console.error('Ответ от сервера:', error.response.data)
		}
	}
})()
