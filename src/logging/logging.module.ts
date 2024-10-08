import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LoggingController } from './logging.controller'
import { LoggingService } from './logging.service'

@Module({
	imports: [
		HttpModule.register({
			timeout: 5000,
			maxRedirects: 5,
		}),
	],
	controllers: [LoggingController],
	providers: [LoggingService],
	exports: [LoggingService],
})
export class LoggingModule {}
