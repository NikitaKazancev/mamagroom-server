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

describe('BreedController (e2e)', () => {
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

	it('/breeds (GET) - должен вернуть 200', async () => {
		const res = await request(app.getHttpServer()).get('/breeds').expect(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('/breeds (POST) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.post('/breeds')
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'Test breed' })
			.expect(401)
	})

	it('/breeds (POST) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.post('/breeds')
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Test breed', type: 'bigDog', language: 'ru' })
			.expect(201)
		expect(res.body.name).toBe('Test breed')
		id = res.body.id
	})

	it('/breeds/id (PUT) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.put(`/breeds/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'Test breed' })
			.expect(401)
	})

	it('/breeds/id (PUT) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.put(`/breeds/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({ name: 'Test breed', type: 'bigDog', language: 'ru' })
			.expect(200)
		expect(res.body.name).toBe('Test breed')
		id = res.body.id
	})

	it('/breeds/id (GET) - должен вернуть 200', async () => {
		const res = await request(app.getHttpServer())
			.get(`/breeds/${id}`)
			.expect(200)
		expect(res.body.id).toBe(id)
		expect(res.body.name).toBe('Test breed')
		expect(res.body.type).toBe('bigDog')
		expect(res.body.language).toBe('ru')
	})

	it('/breeds/:id (DELETE) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.delete(`/breeds/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.expect(401)
	})

	it('/breeds/:id (DELETE) с корректным токеном', async () => {
		await request(app.getHttpServer())
			.delete(`/breeds/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
	})
})
