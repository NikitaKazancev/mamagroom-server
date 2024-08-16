import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConstantModule } from './constant/constant.module'
import { BreedModule } from './entities/breed/breed.module'
import { PriceModule } from './entities/price/price.module'
import { ProcedureModule } from './entities/procedure/procedure.module'
import { FileModule } from './file/file.module'

@Module({
	imports: [
		ProcedureModule,
		PriceModule,
		BreedModule,
		ConstantModule,
		FileModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', 'static'),
			serveRoot: '/api/static',
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
