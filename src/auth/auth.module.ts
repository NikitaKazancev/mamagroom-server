import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/auth/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GithubService } from './oauth/github/github.service'
import { GithubStrategy } from './oauth/github/github.strategy'
import { GoogleService } from './oauth/google/google.service'
import { GoogleStrategy } from './oauth/google/google.strategy'
import { YandexService } from './oauth/yandex/yandex.service'
import { YandexStrategy } from './oauth/yandex/yandex.strategy'

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
		AuthService,
		GithubStrategy,
		GoogleStrategy,
		YandexStrategy,
		GithubService,
		GoogleService,
		YandexService,
	],
	exports: [AuthService],
})
export class AuthModule {}
