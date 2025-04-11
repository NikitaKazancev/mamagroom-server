import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'
import { join } from 'path'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/jwt/jwt.strategy'
import { GithubStrategy } from './auth/oauth/github/github.strategy'
import { GoogleStrategy } from './auth/oauth/google/google.strategy'
import { YandexStrategy } from './auth/oauth/yandex/yandex.strategy'
import { getGoogleRecaptchaConfig } from './auth/recaptcha/google.recaptcha'
import { UserModule } from './auth/user/user.module'
import { MyCacheModule } from './cache/my-cache.module'
import { BreedModule } from './entities/breed/breed.module'
import { ConstantModule } from './entities/constant/constant.module'
import { HeaderNavbarLinkModule } from './entities/header-navbar-link/header-navbar-link.module'
import { MainSliderModule } from './entities/main-slider/main-slider.module'
import { MasterModule } from './entities/master/master.module'
import { PriceModule } from './entities/price/price.module'
import { ProcedureModule } from './entities/procedure/procedure.module'
import { ReviewModule } from './entities/review/review.module'
import { VacancyModule } from './entities/vacancy/vacancy.module'
import { ValueModule } from './entities/value/value.module'
import { FileModule } from './file/file.module'
import { IntegrationModule } from './integration/integration.module'
import { ResponseFromAIModule } from './integration/response-from-ai/response-from-ai.module'
import { KafkaModule } from './kafka/kafka.module'
import { KafkaProducerService } from './kafka/kafka.producer'
import { PrismaReadService, PrismaService } from './prisma.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'static'),
			serveRoot: '/api/static',
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register({
			ttl:
				process.env.NODE_ENV === 'development'
					? 1000
					: 1000 * 60 * 60 * 24 * 7,
			max: 1000,
			isGlobal: true,
		}),
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getGoogleRecaptchaConfig,
			inject: [ConfigService],
		}),
		MyCacheModule,
		BreedModule,
		ConstantModule,
		HeaderNavbarLinkModule,
		MainSliderModule,
		MasterModule,
		PriceModule,
		ProcedureModule,
		VacancyModule,
		ValueModule,
		ReviewModule,
		FileModule,
		IntegrationModule,
		ResponseFromAIModule,
		AuthModule,
		UserModule,
		KafkaModule,
	],
	controllers: [AppController],
	providers: [
		GithubStrategy,
		GoogleStrategy,
		YandexStrategy,
		JwtStrategy,
		PrismaService,
		PrismaReadService,
		KafkaProducerService,
	],
})
export class AppModule {}
