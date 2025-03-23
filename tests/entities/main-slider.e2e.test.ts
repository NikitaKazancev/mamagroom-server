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

describe('MainSlider (e2e)', () => {
	let app: INestApplication
	let token: string
	let id: string

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

	it('/main-slider (GET)', async () => {
		const res = await request(app.getHttpServer())
			.get('/main-slider')
			.expect(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('/main-slider (POST) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.post('/main-slider')
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'TEST' })
			.expect(401)
	})

	it('/main-slider (POST) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.post('/main-slider')
			.set('Authorization', `Bearer ${token}`)
			.send({})
			.expect(201)
		id = res.body.id
		expect(res.body).toMatchObject({
			id,
		})
	})

	it('/main-slider/id (PUT) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.put(`/main-slider/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'TEST' })
			.expect(401)
	})

	it('/main-slider/:id (DELETE) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.delete(`/main-slider/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.expect(401)
	})

	it('/main-slider/:id (DELETE) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.delete(`/main-slider/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
		expect(res.body.isDeleted).toBe(true)
	})
})
