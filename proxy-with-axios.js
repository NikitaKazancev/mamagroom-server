const axios = require('axios')
const { HttpsProxyAgent } = require('https-proxy-agent')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Данные прокси
const PROXY_HOST = '190.111.161.63'
const PROXY_PORT = 9451
const PROXY_USERNAME = 'MRCJrj'
const PROXY_PASSWORD = 'ncNaYB'

// Настройка прокси-агента
const proxyUrl = `http://${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`
const agent = new HttpsProxyAgent(proxyUrl) // Создаем агент через вызов функции

// Настройка запроса к OpenAI API
const apiKey =
	'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' // Замените на ваш API ключ
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
			httpsAgent: agent, // Передаем прокси-агент
		})

		console.log('Ответ от OpenAI:', JSON.stringify(response.data, null, 2))
	} catch (error) {
		console.error('Ошибка при запросе:', error.message)
		if (error.response) {
			console.error('Ответ от сервера:', error.response.data)
		}
	}
})()
