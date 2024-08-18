import { Controller, Delete, Query } from '@nestjs/common'
import { Language, LANGUAGES_LIST } from 'src/utils/constants'
import { badRequest } from 'src/utils/errors'
import { ConstantService } from './constant.service'

@Controller('constants')
export class ConstantController {
	constructor(private readonly constantService: ConstantService) {}

	@Delete()
	deleteOne(
		@Query('language') language: Language,
		@Query('type') type: string,
		@Query('name') name: string
	) {
		if (LANGUAGES_LIST.indexOf(language) === -1)
			badRequest('Invalid language', ConstantController.name, language)

		return this.constantService.deleteOne({ language, name, type })
	}
}
