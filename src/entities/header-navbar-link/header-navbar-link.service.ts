import { Injectable } from '@nestjs/common'
import { FilterDto } from 'src/utils/dtos'
import { HeaderNavbarLinkRepository } from './header-navbar-link.repository'

@Injectable()
export class HeaderNavbarLinkService {
	constructor(private readonly repository: HeaderNavbarLinkRepository) {}

	async findMany(filter: FilterDto) {
		return await this.repository.findMany(filter)
	}
}
