import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { GithubStrategy } from './auth/strategies/github.strategy'
import { GoogleStrategy } from './auth/strategies/google.strategy'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { ConstantModule } from './constant/constant.module'
import { BreedModule } from './entities/breed/breed.module'
import { HeaderNavbarLinkModule } from './entities/header-navbar-link/header-navbar-link.module'
import { PriceModule } from './entities/price/price.module'
import { ProcedureModule } from './entities/procedure/procedure.module'
import { UserModule } from './entities/user/user.module'
import { ValueModule } from './entities/values/value.module'
import { FileModule } from './file/file.module'
import { LoggingModule } from './logging/logging.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'static'),
			serveRoot: '/api/static',
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		// CacheModule.register({
		// 	ttl: 300000, // 5 minutes
		// 	max: 1000,
		// 	isGlobal: true,
		// }),
		ProcedureModule,
		PriceModule,
		BreedModule,
		ConstantModule,
		FileModule,
		HeaderNavbarLinkModule,
		ValueModule,
		AuthModule,
		UserModule,
		LoggingModule,
	],
	controllers: [],
	providers: [
		GithubStrategy,
		GoogleStrategy,
		JwtStrategy,
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: CacheInterceptor,
		// },
	],
})
export class AppModule {}
