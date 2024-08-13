import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ConstantService } from './constant.service'
import { HeaderNavLinksDto } from './dto/header-nav-links.dto'

@Controller('constants')
export class ConstantController {
	constructor(private readonly constantService: ConstantService) {}

	@Get()
	findAll() {
		return this.constantService.findAll()
	}

	@Get('header_nav_links')
	findHeaderNavLinks(@Query('lang') lang: string) {
		return this.constantService.findHeaderNavLinks({
			isUsed: true,
			lang,
		})
	}

	@Post('header_nav_links')
	createHeaderNavLinks(@Body() data: HeaderNavLinksDto) {
		console.log(data)
		return this.constantService.createHeaderNavLinks(data)
	}
}
