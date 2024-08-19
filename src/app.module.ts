import { Module } from '@nestjs/common'
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
		ProcedureModule,
		PriceModule,
		BreedModule,
		ConstantModule,
		FileModule,
		HeaderNavbarLinkModule,
		ValueModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
