import { Controller, Get, Query } from '@nestjs/common'
import { LoggingService } from 'src/logging/logging.service'
import { LogType } from './dto/logging.dto'

@Controller('logs')
export class LoggingController {
	constructor(private readonly loggingService: LoggingService) {}

	@Get()
	findAllBy(@Query('type') type: LogType, @Query('key') key: string) {
		this.loggingService.findAllBy({ type, key })
	}
}
