import { Module } from '@nestjs/common'
import { BreedModule } from './entities/breed/breed.module'
import { PriceModule } from './entities/price/price.module'
import { ProceduresModule } from './entities/procedures/procedures.module'

@Module({
	imports: [ProceduresModule, PriceModule, BreedModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
