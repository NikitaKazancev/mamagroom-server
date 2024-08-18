import { Injectable } from '@nestjs/common'
import { ConstantRepository } from 'src/constant/general/constant.repository'
import { PrismaService } from 'src/prisma.service'
import { Language } from 'src/utils/constants'
import { badRequest, conflict, notFound } from 'src/utils/errors'
import { MainTitleDto } from './dto/main-title.dto'
import { PAGES_HOME } from './pages-home.constants'
import { PagesHomeRepository } from './pages-home.repository'

@Injectable()
export class PagesHomeService {
	constructor(
		private readonly repository: PagesHomeRepository,
		private readonly generalRepository: ConstantRepository,
		private readonly prisma: PrismaService
	) {}

	async findMany(language: Language) {
		return await this.generalRepository.findMany({
			language,
			type: PAGES_HOME.type,
		})
	}

	validateMainTitleAndDescription(dto: MainTitleDto) {
		if (!dto.title && !dto.description)
			badRequest(
				'Main title or description are required',
				PagesHomeService.name,
				dto.language
			)
	}

	async findMainTitleData({ language }: { language?: Language }) {
		const data = await this.generalRepository.findMany({
			language,
			type: PAGES_HOME.type,
			names: [PAGES_HOME.mainTitle, PAGES_HOME.mainDescription],
		})

		const res = {
			title: '',
			description: '',
		}

		data.forEach(({ name, value }) => {
			if (name === PAGES_HOME.mainTitle) res.title = value
			if (name === PAGES_HOME.mainDescription) res.description = value
		})

		return res
	}

	async createMainTitleData(dto: MainTitleDto) {
		if (!dto.title || !dto.description)
			badRequest(
				'Main title and description are required',
				PagesHomeService.name,
				dto.language
			)

		try {
			return await this.generalRepository.createMany([
				{
					language: dto.language,
					type: PAGES_HOME.type,
					name: PAGES_HOME.mainTitle,
					value: dto.title,
				},
				{
					language: dto.language,
					type: PAGES_HOME.type,
					name: PAGES_HOME.mainDescription,
					value: dto.description,
				},
			])
		} catch (e) {
			conflict(
				'Main title and description',
				PagesHomeService.name,
				dto.language
			)
		}
	}

	async changeMainTitleData(dto: MainTitleDto) {
		if (!dto.title && !dto.description)
			badRequest(
				'Main title or description are required',
				PagesHomeService.name,
				dto.language
			)

		try {
			return await this.prisma.$transaction(async _ => {
				if (dto.title) {
					await this.generalRepository.changeOne({
						language: dto.language,
						type: PAGES_HOME.type,
						name: PAGES_HOME.mainTitle,
						value: dto.title,
					})
				}
				if (dto.description) {
					await this.generalRepository.changeOne({
						language: dto.language,
						type: PAGES_HOME.type,
						name: PAGES_HOME.mainDescription,
						value: dto.description,
					})
				}
			})
		} catch (e) {
			if (dto.title) {
				notFound('Main title', PagesHomeService.name, dto.language)
			} else {
				notFound('Main description', PagesHomeService.name, dto.language)
			}
		}
	}
}
