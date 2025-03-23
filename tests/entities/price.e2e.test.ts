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

describe('Price (e2e)', () => {
	let app: INestApplication
	let token: string
	let id: string
	let procedureId: string
	let breedId: string

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

	it('/prices (GET)', async () => {
		const res = await request(app.getHttpServer()).get('/prices').expect(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('/prices (POST) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.post('/prices')
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'TEST' })
			.expect(401)
	})

	it('/prices (POST) с корректным токеном', async () => {
		const procedureRes = await request(app.getHttpServer())
			.post('/procedures')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'TEST',
				description: '',
				language: 'ru',
				isDeleted: true,
			})
			.expect(201)
		const breedRes = await request(app.getHttpServer())
			.post('/breeds')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'TEST',
				type: 'smallDog',
				language: 'ru',
				isDeleted: true,
			})
			.expect(201)

		procedureId = procedureRes.body.id
		breedId = breedRes.body.id

		const data = {
			breedId,
			procedureId,
			weight: 30,
			time: 60,
			price: 1000,
		}

		const res = await request(app.getHttpServer())
			.post('/prices')
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.expect(201)
		id = res.body.id
		expect(res.body).toMatchObject(data)
	})

	it('/prices/id (PUT) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.put(`/prices/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'TEST' })
			.expect(401)
	})

	it('/prices/id (PUT) с корректным токеном', async () => {
		const data = {
			breedId,
			procedureId,
			weight: null,
			time: 120,
			price: 2000,
		}

		const res = await request(app.getHttpServer())
			.put(`/prices/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.expect(200)
		expect(res.body).toMatchObject(data)
	})

	it('/prices/:id (DELETE) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.delete(`/prices/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.expect(401)
	})

	it('/prices/:id (DELETE) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.delete(`/prices/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
		expect(res.body.isDeleted).toBe(true)
	})
})
