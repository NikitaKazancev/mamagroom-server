import { Injectable } from '@nestjs/common'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { HeaderNavbarLinkDto } from './header-navbar-link.dto'
import { HeaderNavbarLinkRepository } from './header-navbar-link.repository'

@Injectable()
export class HeaderNavbarLinkService {
	constructor(private readonly repository: HeaderNavbarLinkRepository) {}

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

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async create(headerNavbarLink: HeaderNavbarLinkDto) {
		if (headerNavbarLink.parentLinkId) {
			await this.checkExistence(headerNavbarLink.parentLinkId)
		}

		const headerNavbarLinkInDb = await this.repository.findMany({
			name: headerNavbarLink.name,
		})

		if (headerNavbarLinkInDb.length) {
			conflict(
				`headerNavbarLink by name = ${headerNavbarLink.name}`,
				HeaderNavbarLinkService.name
			)
		}

		if (!headerNavbarLink.order) {
			const aggregation = await this.repository.findMaxOrder()

			if (!aggregation) {
				headerNavbarLink.order = 1
			} else {
				headerNavbarLink.order = aggregation._max.order + 1
			}
		}

		return await this.repository.create(headerNavbarLink)
	}

	async change(id: string, headerNavbarLink: HeaderNavbarLinkDto) {
		await this.checkExistence(id)

		if (headerNavbarLink.parentLinkId) {
			await this.checkExistence(headerNavbarLink.parentLinkId)
		}

		return await this.repository.change(id, headerNavbarLink)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}
}
