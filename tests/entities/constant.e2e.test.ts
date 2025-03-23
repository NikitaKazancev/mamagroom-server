import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { KafkaConsumerService } from 'src/kafka/kafka.consumer'
import { KafkaProducerService } from 'src/kafka/kafka.producer'
import * as request from 'supertest'
import {
	KafkaConsumerServiceMock,
	KafkaProducerServiceMock,
} from 'tests/kafka/kafka-mock'
import { AppModule } from '../../src/app.module'

describe('Constant (e2e)', () => {
	let app: INestApplication
	let token: string

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider(KafkaProducerService)
			.useClass(KafkaProducerServiceMock)
			.overrideProvider(KafkaConsumerService)
			.useClass(KafkaConsumerServiceMock)
			.compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
		await app.init()

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ email: 'my@nikita-kazantsev.ru', password: '123' })
		token = loginResponse.body.token
	})

	afterAll(async () => {
		await request(app.getHttpServer())
			.delete('/delete-marked-for-deletion')
			.set('Authorization', `Bearer ${token}`)
		await app.close()
	})

	it('/constants (GET)', async () => {
		const res = await request(app.getHttpServer())
			.get('/constants')
			.expect(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('/constants (POST) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.post('/constants')
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'Test constant' })
			.expect(401)
	})

	it('/constants (PUT) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.put(`/constants`)
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'Test constant' })
			.expect(401)
	})

	it('/constants (PUT) с корректным токеном', async () => {
		const data = {
			language: 'ru',
			type: 'home-page',
			name: 'main-title',
			value: 'TEST',
		}

		const res = await request(app.getHttpServer())
			.put(`/constants`)
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.expect(200)
		expect(res.body).toMatchObject(data)
	})
	it('/constants (PUT) с корректным токеном', async () => {
		const data = {
			language: 'ru',
			type: 'home-page',
			name: 'main-title',
			value: 'МамагруМ',
		}

		const res = await request(app.getHttpServer())
			.put(`/constants`)
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.expect(200)
		expect(res.body).toMatchObject(data)
	})
})
