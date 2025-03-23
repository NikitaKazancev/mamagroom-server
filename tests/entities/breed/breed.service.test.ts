import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Test, TestingModule } from '@nestjs/testing'
import { BreedRepository } from '../../../src/entities/breed/breed.repository'
import { BreedService } from '../../../src/entities/breed/breed.service'

describe('BreedService', () => {
	let service: BreedService
	let repository: jest.Mocked<BreedRepository>
	const date = new Date()

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BreedService,
				{
					provide: BreedRepository,
					useValue: {
						findMany: jest.fn(),
						findById: jest.fn(),
						findByName: jest.fn(),
						create: jest.fn(),
						change: jest.fn(),
						markToDelete: jest.fn(),
					},
				},
			],
		}).compile()

		service = module.get<BreedService>(BreedService)
		repository = module.get(BreedRepository)
	})

	it('findMany should call repository with filter', async () => {
		await service.findMany({ type: 'dogs' })
		expect(repository.findMany).toHaveBeenCalledWith(
			{ type: 'dogs' },
			undefined
		)
	})

	it('findById should throw if not found', async () => {
		repository.findById.mockResolvedValue(null)
		await expect(service.findById('123')).rejects.toThrowError()
	})

	it('create should check uniqueness and create', async () => {
		repository.findByName.mockResolvedValue(null)
		repository.create.mockResolvedValue({
			id: '1',
			name: 'Labrador',
			type: 'bigDog',
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			language: 'ru',
		})
		const result = await service.create({
			name: 'Labrador',
			type: 'dog',
		} as any)
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

	it('delete should mark to delete after checkExistence', async () => {
		repository.findById.mockResolvedValue({
			id: '1',
			name: 'Labrador',
			type: 'bigDog',
			createdAt: date,
			updatedAt: date,
			isDeleted: false,
			language: 'ru',
		})
		repository.markToDelete.mockResolvedValue({
			id: '1',
			name: 'Labrador',
			type: 'bigDog',
			createdAt: date,
			updatedAt: date,
			isDeleted: true,
			language: 'ru',
		})
		const result = await service.delete('1')
		expect(result.isDeleted).toBe(true)
	})
})
