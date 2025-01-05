import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BreedModule } from 'src/entities/breed/breed.module'
import { ProcedureModule } from 'src/entities/procedure/procedure.module'
import { FileModule } from 'src/file/file.module'
import { AIService } from './ai/ai.service'
import { OpenAIService } from './ai/openai.service'
import { SberService } from './ai/sber.service'
import { YandexService } from './ai/yandex.service'
import { IntegrationService } from './integration.service'
import { ResponseFromAIModule } from './response-from-ai/response-from-ai.module'

@Module({
	imports: [
		forwardRef(() => ProcedureModule),
		BreedModule,
		ResponseFromAIModule,
		ConfigModule,
		FileModule,
	],
	controllers: [],
	providers: [
		IntegrationService,
		AIService,
		OpenAIService,
		YandexService,
		SberService,
	],
	exports: [IntegrationService],
})
export class IntegrationModule {}
