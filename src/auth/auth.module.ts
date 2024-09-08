import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { UserModule } from 'src/entities/user/user.module'
import { LoggingModule } from 'src/logging/logging.module'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GithubStrategy } from './strategies/github.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		UserModule,
		HttpModule,
		LoggingModule,
	],
	controllers: [AuthController],
	providers: [PrismaService, AuthService, GithubStrategy],
})
export class AuthModule {}
