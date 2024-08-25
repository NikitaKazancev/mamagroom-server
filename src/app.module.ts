import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConstantModule } from './constant/constant.module'
import { BreedModule } from './entities/breed/breed.module'
import { HeaderNavbarLinkModule } from './entities/header-navbar-link/header-navbar-link.module'
import { PriceModule } from './entities/price/price.module'
import { ProcedureModule } from './entities/procedure/procedure.module'
import { ValueModule } from './entities/values/value.module'
import { FileModule } from './file/file.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'static'),
			serveRoot: '/api/static',
		}),
		CacheModule.register({
			// ttl: 300000, // 5 minutes
			max: 1000,
			isGlobal: true,
		}),
		ProcedureModule,
		PriceModule,
		BreedModule,
		ConstantModule,
		FileModule,
		HeaderNavbarLinkModule,
		ValueModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
