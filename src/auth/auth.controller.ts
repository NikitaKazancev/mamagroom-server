import { Controller, Get, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { LogType } from 'src/logging/dto/logging.dto'
import { LoggingService } from 'src/logging/logging.service'

@Controller('auth')
export class AuthController {
	MICROSERVICE_AUTH_URL = ''

	constructor(
		private readonly configService: ConfigService,
		private readonly loggingService: LoggingService
	) {
		this.MICROSERVICE_AUTH_URL = this.configService.get(
			'MICROSERVICE_AUTH_URL'
		)
	}

	@Get('github')
	async githubAuth(@Res({ passthrough: true }) res: Response) {
		this.loggingService.save({
			type: LogType.info,
			key: 'Authentication',
			message: 'redirect to GitHub OAuth',
		})
		res.redirect(`${this.MICROSERVICE_AUTH_URL}/github`)
	}

	@Get('google')
	async googleAuth(@Res({ passthrough: true }) res: Response) {
		this.loggingService.save({
			type: LogType.info,
			key: 'Authentication',
			message: 'redirect to Google OAuth',
		})
		res.redirect(`${this.MICROSERVICE_AUTH_URL}/google`)
	}
}
