import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { HeaderNavbarLinkController } from './header-navbar-link.controller'
import { HeaderNavbarLinkRepository } from './header-navbar-link.repository'
import { HeaderNavbarLinkService } from './header-navbar-link.service'

@Module({
	controllers: [HeaderNavbarLinkController],
	providers: [
		HeaderNavbarLinkService,
		HeaderNavbarLinkRepository,
		PrismaService,
	],
})
export class HeaderNavbarLinkModule {}
