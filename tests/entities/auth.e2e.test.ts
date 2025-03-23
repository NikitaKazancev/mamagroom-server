import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { verify } from 'argon2'
import { KafkaConsumerService } from 'src/kafka/kafka.consumer'
import { KafkaProducerService } from 'src/kafka/kafka.producer'
import * as request from 'supertest'
import {
	KafkaConsumerServiceMock,
	KafkaProducerServiceMock,
} from 'tests/kafka/kafka-mock'
import { AppModule } from '../../src/app.module'

describe('Auth (e2e)', () => {
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

	it('/auth/register (POST)', async () => {
		const data = { email: 'test@test.ru', password: '123' }

		const res = await request(app.getHttpServer())
			.post('/auth/register')
			.send(data)
			.expect(201)
		id = res.body.id
		expect(res.body).toMatchObject({ email: 'test@test.ru' })
		expect(await verify(res.body.password, '123')).toBe(true)
	})

	it('/auth/login (POST) некорректные данные', async () => {
		const data = { email: 'test@test.ru', password: '1234' }

		await request(app.getHttpServer())
			.post('/auth/login')
			.send(data)
			.expect(401)
	})

	it('/auth/login (POST) корректные данные', async () => {
		const data = { email: 'test@test.ru', password: '123' }

		await request(app.getHttpServer())
			.post('/auth/login')
			.send(data)
			.expect(201)
	})

	it('/users/:id (DELETE)', async () => {
		const res = await request(app.getHttpServer())
			.delete(`/users/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
		expect(res.body.isDeleted).toBe(true)
	})
})
