import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { UserModule } from 'src/entities/user/user.module'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GithubStrategy } from './strategies/github.strategy'
import { GoogleStrategy } from './strategies/google.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		UserModule,
	],
	controllers: [AuthController],
	providers: [PrismaService, AuthService, GithubStrategy, GoogleStrategy],
})
export class AuthModule {}
