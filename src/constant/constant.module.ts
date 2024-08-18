import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ConstantController } from './general/constant.controller'
import { ConstantRepository } from './general/constant.repository'
import { ConstantService } from './general/constant.service'
import { PagesHomeController } from './pages/home/pages-home.controller'
import { PagesHomeRepository } from './pages/home/pages-home.repository'
import { PagesHomeService } from './pages/home/pages-home.service'

@Module({
	controllers: [ConstantController, PagesHomeController],
	providers: [
		PrismaService,
		ConstantService,
		ConstantRepository,
		PagesHomeService,
		PagesHomeRepository,
	],
})
export class ConstantModule {}
