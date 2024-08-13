import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { HeaderNavLinksDto } from './dto/header-nav-links.dto'

@Injectable()
export class ConstantRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.constant.findMany({})
	}

	findHeaderNavLinks({ isUsed, lang }: { isUsed?: boolean; lang?: string }) {
		return this.prisma.constant.findFirst({
			where: {
				name: 'header_nav_links',
				isDeleted: false,
				isUsed,
				language: lang,
			},
		})
	}

	createHeaderNavLinks(data: HeaderNavLinksDto) {
		return this.prisma.constant.create({
			data: {
				name: 'header_nav_links',
				language: data.lang,
				value: JSON.stringify(data.data),
			},
		})
	}
}
