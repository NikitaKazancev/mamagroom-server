import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/auth/user/user.module'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GithubService } from './oauth/github/github.service'
import { GithubStrategy } from './oauth/github/github.strategy'
import { GoogleService } from './oauth/google/google.service'
import { GoogleStrategy } from './oauth/google/google.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
			}),
		}),
		UserModule,
	],
	controllers: [AuthController],
	providers: [
		PrismaService,
		AuthService,
		GithubStrategy,
		GoogleStrategy,
		GithubService,
		GoogleService,
	],
	exports: [AuthService],
})
export class AuthModule {}
