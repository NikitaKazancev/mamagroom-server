import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BreedModule } from 'src/entities/breed/breed.module'
import { ProcedureModule } from 'src/entities/procedure/procedure.module'
import { IntegrationService } from './integration.service'

@Module({
	imports: [BreedModule, ProcedureModule, ConfigModule],
	controllers: [],
	providers: [IntegrationService],
	exports: [IntegrationService],
})
export class IntegrationModule {}
