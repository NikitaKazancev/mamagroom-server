import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { LogType } from './dto/logging.dto'
import { LoggingController } from './logging.controller'
import { LoggingService } from './logging.service'

describe('LoggingController', () => {
	let controller: LoggingController
	let service: LoggingService

	const mockHttpService = {
		get: jest.fn(),
		post: jest.fn(),
	}

	const mockConfigService = {
		get: jest.fn().mockReturnValue('http://mock-url.com'),
	}

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [LoggingController],
			providers: [
				LoggingService,
				{ provide: HttpService, useValue: mockHttpService },
				{ provide: ConfigService, useValue: mockConfigService },
			],
		}).compile()

		controller = moduleRef.get<LoggingController>(LoggingController)
		service = moduleRef.get<LoggingService>(LoggingService)
	})

	describe('findAllBy', () => {
		it('should return an array of logs', async () => {
			const result = {
				data: [
					{
						id: 1,
						type: LogType.info,
						key: 'test',
						message: 'test',
					},
				],
			}
			jest.spyOn(service, 'findAllBy').mockResolvedValue(result)

			expect(await controller.findAllBy(LogType.info, 'test')).toBe(result)
		})
	})
})
