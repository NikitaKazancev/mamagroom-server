import { Module } from '@nestjs/common'
import { PrismaReadService, PrismaService } from 'src/prisma.service'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, PrismaReadService, UserRepository],
	exports: [UserService],
	imports: [],
})
export class UserModule {}
