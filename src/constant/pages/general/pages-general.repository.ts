import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { HeaderNavLinksDto } from './dto/header-nav-links.dto'
import { PAGES_GENERAL } from './pages-general.constants'

@Injectable()
export class PagesGeneralRepository {
	constructor(private readonly prisma: PrismaService) {}

	createHeaderNavLinks(dto: HeaderNavLinksDto) {
		return this.prisma.constant.create({
			data: {
				language: dto.language,
				type: PAGES_GENERAL.type,
				name: PAGES_GENERAL.headerNavLinks,
				value: JSON.stringify(dto.data),
			},
			select: {
				value: true,
			},
		})
	}

	changeHeaderNavLinks(dto: HeaderNavLinksDto) {
		return this.prisma.constant.update({
			where: {
				language_type_name: {
					type: PAGES_GENERAL.type,
					name: PAGES_GENERAL.headerNavLinks,
					language: dto.language,
				},
			},
			data: {
				value: JSON.stringify(dto.data),
			},
			select: {
				value: true,
			},
		})
	}
}
