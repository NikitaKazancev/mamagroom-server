import { Controller, Get, Query } from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { HeaderNavbarLinkService } from './header-navbar-link.service'

@Controller('header-navbar-links')
export class HeaderNavbarLinkController {
	constructor(private readonly service: HeaderNavbarLinkService) {}

	@Get()
	findMany(
		@Query('language') language: Language,
		@Query('isUsed') isUsed: boolean
	) {
		return this.service.findMany({ language, isUsed })
	}
}
