import { Injectable } from '@nestjs/common'
import { ConstantRepository } from 'src/constant/general/constant.repository'
import { PagesGeneralRepository } from './pages-general.repository'

@Injectable()
export class PagesGeneralService {
	constructor(
		private readonly repository: PagesGeneralRepository,
		private readonly generalRepository: ConstantRepository
	) {}

	// async findAll({
	// 	isUsed,
	// 	language,
	// }: {
	// 	isUsed?: boolean
	// 	language?: Language
	// }) {
	// 	return await this.generalRepository.findAll({
	// 		language,
	// 		type: PAGES_GENERAL.type,
	// 		isUsed,
	// 	})
	// }

	// validateHeaderNavLinks(dto: HeaderNavLinksDto) {
	// 	dto.data.forEach(data => {
	// 		if (!data.link && !data.sublinks)
	// 			badRequest(
	// 				'Link or sublinks are required',
	// 				PagesGeneralService.name,
	// 				dto.language
	// 			)
	// 	})
	// }

	// async findHeaderNavLinks({
	// 	isUsed,
	// 	language,
	// }: {
	// 	isUsed?: boolean
	// 	language?: Language
	// }) {
	// 	const res = await this.generalRepository.findOne({
	// 		language,
	// 		type: PAGES_GENERAL.type,
	// 		name: PAGES_GENERAL.headerNavLinks,
	// 		isUsed,
	// 	})

	// 	if (!res) notFound('Header nav links', PagesGeneralService.name, language)

	// 	return JSON.parse(res.value) as HeaderNavLinks
	// }

	// async createHeaderNavLinks(dto: HeaderNavLinksDto) {
	// 	this.validateHeaderNavLinks(dto)

	// 	try {
	// 		return await this.repository.createHeaderNavLinks(dto)
	// 	} catch (e) {
	// 		conflict('Header nav links', PagesGeneralService.name, dto.language)
	// 	}
	// }

	// async changeHeaderNavLinks(dto: HeaderNavLinksDto) {
	// 	this.validateHeaderNavLinks(dto)

	// 	try {
	// 		return await this.repository.changeHeaderNavLinks(dto)
	// 	} catch (e) {
	// 		notFound('Header nav links', PagesGeneralService.name, dto.language)
	// 	}
	// }
}
