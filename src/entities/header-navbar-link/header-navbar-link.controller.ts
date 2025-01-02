import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Language } from 'src/utils/constants'
import { HeaderNavbarLinkDto } from './header-navbar-link.dto'
import { HeaderNavbarLinkService } from './header-navbar-link.service'

@Controller('header-navbar-links')
export class HeaderNavbarLinkController {
	constructor(private readonly service: HeaderNavbarLinkService) {}

	@Get()
	async findMany(@Query() language?: Language, @Query() isDeleted?: boolean) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	async create(@Body() data: HeaderNavbarLinkDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	async change(@Param('id') id: string, @Body() data: HeaderNavbarLinkDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
