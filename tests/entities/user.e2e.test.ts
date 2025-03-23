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

describe('User (e2e)', () => {
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

	it('/users (GET) с неверным токеном', async () => {
		const res = await request(app.getHttpServer())
			.get('/users')
			.set('Authorization', 'Bearer wrong_token')
			.expect(401)
	})

	it('/users (GET) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.get('/users')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
		expect(Array.isArray(res.body)).toBe(true)
	})

	it('/users (POST) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.post('/users')
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'TEST' })
			.expect(401)
	})

	it('/users (POST) с корректным токеном', async () => {
		const data = {
			email: 'test@test.ru',
			password: '123',
			roles: ['userGet'],
		}

		const res = await request(app.getHttpServer())
			.post('/users')
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.expect(201)
		id = res.body.id
		expect(res.body).toMatchObject({
			email: data.email,
			roles: data.roles,
		})
		expect(await verify(res.body.password, '123')).toBe(true)
	})

	it('/users/id (PUT) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.put(`/users/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.send({ name: 'TEST' })
			.expect(401)
	})

	it('/users/id (PUT) с корректным токеном', async () => {
		const data = {
			email: 'test2@test.ru',
			password: '234',
			roles: ['userPost'],
		}

		const res = await request(app.getHttpServer())
			.put(`/users/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.expect(200)
		expect(res.body).toMatchObject({
			email: data.email,
			roles: data.roles,
		})
		expect(await verify(res.body.password, '234')).toBe(true)
	})

	it('/users/:id (DELETE) с неверным токеном', async () => {
		await request(app.getHttpServer())
			.delete(`/users/${id}`)
			.set('Authorization', 'Bearer wrong_token')
			.expect(401)
	})

	it('/users/:id (DELETE) с корректным токеном', async () => {
		const res = await request(app.getHttpServer())
			.delete(`/users/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
		expect(res.body.isDeleted).toBe(true)
	})
})
