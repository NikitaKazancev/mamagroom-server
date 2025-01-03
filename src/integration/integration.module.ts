import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BreedModule } from 'src/entities/breed/breed.module'
import { ProcedureModule } from 'src/entities/procedure/procedure.module'
import { AIService } from './ai/ai.service'
import { OpenAIService } from './ai/openai.service'
import { IntegrationService } from './integration.service'
import { ResponseFromAIModule } from './response-from-ai/response-from-ai.module'

@Module({
	imports: [BreedModule, ProcedureModule, ResponseFromAIModule, ConfigModule],
	controllers: [],
	providers: [IntegrationService, AIService, OpenAIService],
	exports: [IntegrationService],
})
export class IntegrationModule {}
