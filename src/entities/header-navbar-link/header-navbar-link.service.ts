import { Injectable } from '@nestjs/common'
import { HeaderNavbarLink } from '@prisma/client'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import {
	HeaderNavbarLinkDto,
	RequiredHeaderNavbarLinkDto,
} from './header-navbar-link.dto'
import { HeaderNavbarLinkRepository } from './header-navbar-link.repository'

@Injectable()
export class HeaderNavbarLinkService {
	constructor(private readonly repository: HeaderNavbarLinkRepository) {}

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(headerNavbarLink: HeaderNavbarLinkDto) {
		await this.checkUniqFields(headerNavbarLink)

		if (headerNavbarLink.parentLinkId) {
			await this.checkExistence(headerNavbarLink.parentLinkId)
		}

		headerNavbarLink.order = undefined

		const filledHeaderNavbarLink =
			await this.fillRequiredFields(headerNavbarLink)

		return await this.repository.create(filledHeaderNavbarLink)
	}

	async change(id: string, headerNavbarLink: HeaderNavbarLinkDto) {
		const headerNavbarLinkInDb = await this.checkExistence(id)

		if (headerNavbarLink.parentLinkId != headerNavbarLinkInDb.parentLinkId) {
			await this.checkExistence(headerNavbarLink.parentLinkId)
		}

		if (headerNavbarLinkInDb.name !== headerNavbarLink.name) {
			await this.checkUniqFields(headerNavbarLink)
		}

		const filledHeaderNavbarLink = await this.fillRequiredFieldsByObject(
			headerNavbarLink,
			headerNavbarLinkInDb
		)

		if (headerNavbarLink.order !== headerNavbarLinkInDb.order) {
			return await this.repository.changeWithOrder(
				id,
				filledHeaderNavbarLink
			)
		}

		return await this.repository.change(id, filledHeaderNavbarLink)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, HeaderNavbarLinkService.name)
		}

		const headerNavbarLink = await this.repository.findById(id)
		if (!headerNavbarLink) {
			notFound(
				`headerNavbarLink by id = ${id}`,
				HeaderNavbarLinkService.name
			)
		}

		return headerNavbarLink
	}

	private async checkUniqFields(headerNavbarLink: HeaderNavbarLinkDto) {
		const headerNavbarLinkInDb = await this.repository.findByName(
			headerNavbarLink.name
		)

		if (headerNavbarLinkInDb) {
			conflict(
				`headerNavbarLink by name = ${headerNavbarLink.name}`,
				HeaderNavbarLinkService.name
			)
		}

		return headerNavbarLinkInDb
	}

	private async fillRequiredFields(
		headerNavbarLink: HeaderNavbarLinkDto
	): Promise<RequiredHeaderNavbarLinkDto> {
		let order = headerNavbarLink.order
		if (!order) {
			const aggregation = await this.repository.findMaxOrder()

			if (!aggregation) {
				order = 1
			} else {
				order = aggregation._max.order + 1
			}
		}

		return { ...headerNavbarLink, order }
	}

	private async fillRequiredFieldsByObject(
		headerNavbarLink: HeaderNavbarLinkDto,
		headerNavbarLinkInDb: HeaderNavbarLink
	): Promise<RequiredHeaderNavbarLinkDto> {
		let order = headerNavbarLink.order
		if (!order) {
			order = headerNavbarLinkInDb.order
		}

		return { ...headerNavbarLink, order }
	}
}
