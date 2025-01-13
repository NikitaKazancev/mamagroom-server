import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/jwt/jwt.strategy'
import { GithubStrategy } from './auth/oauth/github/github.strategy'
import { GoogleStrategy } from './auth/oauth/google/google.strategy'
import { UserModule } from './auth/user/user.module'
import { BreedModule } from './entities/breed/breed.module'
import { ConstantModule } from './entities/constant/constant.module'
import { HeaderNavbarLinkModule } from './entities/header-navbar-link/header-navbar-link.module'
import { MainSliderModule } from './entities/main-slider/main-slider.module'
import { MasterModule } from './entities/master/master.module'
import { PriceModule } from './entities/price/price.module'
import { ProcedureModule } from './entities/procedure/procedure.module'
import { VacancyModule } from './entities/vacancy/vacancy.module'
import { ValueModule } from './entities/value/value.module'
import { FileModule } from './file/file.module'
import { IntegrationModule } from './integration/integration.module'
import { ResponseFromAIModule } from './integration/response-from-ai/response-from-ai.module'
import { KafkaModule } from './kafka/kafka.module'
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
			ttl: 1000 * 60 * 5,
			max: 1000,
			isGlobal: true,
		}),
		BreedModule,
		ConstantModule,
		HeaderNavbarLinkModule,
		MainSliderModule,
		MasterModule,
		PriceModule,
		ProcedureModule,
		VacancyModule,
		ValueModule,
		FileModule,
		IntegrationModule,
		ResponseFromAIModule,
		AuthModule,
		UserModule,
		KafkaModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
		GithubStrategy,
		GoogleStrategy,
		JwtStrategy,
		PrismaService,
		PrismaReadService,
	],
})
export class AppModule {}
