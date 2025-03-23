import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Test, TestingModule } from '@nestjs/testing'
import { BreedController } from '../../../src/entities/breed/breed.controller'
import { BreedService } from '../../../src/entities/breed/breed.service'

describe('BreedController', () => {
	let controller: BreedController
	let service: jest.Mocked<BreedService>
	const date = new Date()

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BreedController],
			providers: [
				{
					provide: BreedService,
					useValue: {
						findMany: jest.fn(),
						findById: jest.fn(),
						create: jest.fn(),
						change: jest.fn(),
						delete: jest.fn(),
					},
				},
				{
					provide: CACHE_MANAGER,
					useValue: {
						get: jest.fn(),
						set: jest.fn(),
						del: jest.fn(),
					} as Partial<Cache>,
				},
			],
		}).compile()

		controller = module.get<BreedController>(BreedController)
		service = module.get(BreedService)
	})

	it('findMany should return result from service', async () => {
		service.findMany.mockResolvedValue([
			{
				id: '1',
				name: 'Labrador',
				type: 'bigDog',
				createdAt: date,
				updatedAt: date,
				isDeleted: false,
				language: 'ru',
			},
		])
		const result = await controller.findMany()
		expect(result).toEqual([
			{
				id: '1',
				name: 'Labrador',
				type: 'bigDog',
				createdAt: date,
				updatedAt: date,
				isDeleted: false,
				language: 'ru',
			},
		])
	})

	it('create should call service.create', async () => {
		const dto = {
			id: '1',
			name: 'Labrador',
			type: 'bigDog',
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			language: 'ru',
		} as any
		service.create.mockResolvedValue({
			id: '1',
			name: 'Labrador',
			type: 'bigDog',
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			language: 'ru',
		})
		const result = await controller.create(dto)
		expect(result).toEqual({
			id: '1',
			name: 'Labrador',
			type: 'bigDog',
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			language: 'ru',
		})
	})
})
