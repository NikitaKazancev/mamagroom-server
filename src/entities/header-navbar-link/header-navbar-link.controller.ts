import { CacheInterceptor } from '@nestjs/cache-manager'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { type Language } from 'src/utils/constants'
import { getMemStart, logUsedMemory } from 'src/utils/functions'
import { HeaderNavbarLinkDto } from './header-navbar-link.dto'
import { HeaderNavbarLinkService } from './header-navbar-link.service'

@Controller('header-navbar-links')
@UseInterceptors(CacheInterceptor)
export class HeaderNavbarLinkController {
	constructor(private readonly service: HeaderNavbarLinkService) {}

	@Get()
	async findMany(
		@Query('language') language?: Language,
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const memStart = getMemStart()
		const response = await this.service.findById(id)
		logUsedMemory(memStart, 'findById header-navbar-links')
		return response
	}

	@Post()
	@Auth(Role.headerNavbarLinkPost)
	async create(@Body() data: HeaderNavbarLinkDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.headerNavbarLinkPut)
	async change(@Param('id') id: string, @Body() data: HeaderNavbarLinkDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.headerNavbarLinkDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
