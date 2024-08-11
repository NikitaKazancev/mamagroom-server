import { Module } from '@nestjs/common'
import { ConstantModule } from './constant/constant.module'
import { BreedModule } from './entities/breed/breed.module'
import { PriceModule } from './entities/price/price.module'
import { ProcedureModule } from './entities/procedure/procedure.module'

@Module({
	imports: [ProcedureModule, PriceModule, BreedModule, ConstantModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
