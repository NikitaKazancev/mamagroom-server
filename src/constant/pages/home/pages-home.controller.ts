import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { MainTitleDto } from './dto/main-title.dto'
import { PAGES_HOME } from './pages-home.constants'
import { PagesHomeService } from './pages-home.service'

@Controller(`constants/pages/home`)
export class PagesHomeController {
	constructor(private readonly service: PagesHomeService) {}

	@Get()
	findMany(@Query('language') language: Language) {
		return this.service.findMany(language)
	}

	@Get(PAGES_HOME.mainTitle)
	findMainTitleData(@Query('language') language: Language) {
		return this.service.findMainTitleData({
			language,
		})
	}

	@Post(PAGES_HOME.mainTitle)
	createMainTitleData(@Body() data: MainTitleDto) {
		return this.service.createMainTitleData(data)
	}

	@Put(PAGES_HOME.mainTitle)
	changeMainTitleData(@Body() data: MainTitleDto) {
		return this.service.changeMainTitleData(data)
	}
}
