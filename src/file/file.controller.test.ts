import { Test, TestingModule } from '@nestjs/testing'
import * as fs from 'fs'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { FILE_PATHS } from './utils/file.constants'

describe('FileController', () => {
	let controller: FileController
	let service: FileService

	const mockDirents = [
		{ name: 'image1.jpg', isFile: () => true },
		{ name: 'image2.jpg', isFile: () => true },
	] as fs.Dirent[]

	beforeEach(async () => {
		jest.spyOn(fs, 'readdirSync').mockReturnValue(mockDirents)

		const module: TestingModule = await Test.createTestingModule({
			controllers: [FileController],
			providers: [FileService],
		}).compile()

		controller = module.get<FileController>(FileController)
		service = module.get<FileService>(FileService)
	})

	describe('findSliderAboutUsDestinations', () => {
		it('should return an array of file paths', () => {
			const result = mockDirents.map(
				fileName => `/static/${FILE_PATHS.sliderAboutUs}/${fileName}`
			)

			expect(controller.findSliderAboutUsDestinations()).toEqual(result)
		})
	})
})
