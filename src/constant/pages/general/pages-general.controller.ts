import { Controller } from '@nestjs/common'
import { PagesGeneralService } from './pages-general.service'

@Controller(`constants/pages/general`)
export class PagesGeneralController {
	constructor(private readonly service: PagesGeneralService) {}

	// @Get()
	// findAll(
	// 	@Query('language') language: Language,
	// 	@Query('isUsed') isUsed: boolean
	// ) {
	// 	return this.service.findMany({ isUsed, language })
	// }

	// @Get(PAGES_GENERAL.headerNavLinks)
	// findHeaderNavLinks(
	// 	@Query('language') language: Language,
	// 	@Query('isUsed') isUsed: boolean
	// ) {
	// 	return this.service.findHeaderNavLinks({
	// 		isUsed,
	// 		language,
	// 	})
	// }

	// @Post(PAGES_GENERAL.headerNavLinks)
	// createHeaderNavLinks(@Body() dto: HeaderNavLinksDto) {
	// 	return this.service.createHeaderNavLinks(dto)
	// }

	// @Put(PAGES_GENERAL.headerNavLinks)
	// changeHeaderNavLinks(@Body() dto: HeaderNavLinksDto) {
	// 	return this.service.changeHeaderNavLinks(dto)
	// }
}
