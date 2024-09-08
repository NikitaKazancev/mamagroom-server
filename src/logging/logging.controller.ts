import { Controller, Get, Query } from '@nestjs/common'
import { LogType } from './dto/logging.dto'
import { LoggingService } from './logging.service'

@Controller('logs')
export class LoggingController {
	constructor(private readonly loggingService: LoggingService) {}

	@Get()
	findAllBy(@Query('type') type: LogType, @Query('key') key: string) {
		return this.loggingService.findAllBy({ type, key })
	}
}
