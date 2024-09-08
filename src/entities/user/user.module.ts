import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, UserRepository],
	exports: [UserService],
	imports: [
		HttpModule.register({
			timeout: 5000,
			maxRedirects: 5,
		}),
	],
})
export class UserModule {}
