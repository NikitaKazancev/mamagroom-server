import {
	ArgumentsHost,
	Catch,
	ConflictException,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common'

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(MyExceptionFilter.name)

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const request = ctx.getRequest()

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		const message =
			exception instanceof HttpException
				? exception.getResponse()
				: 'Internal server error'

		const logMessage = `Error ${status} at ${request.method} ${request.url}: ${JSON.stringify(message)}`

		if (exception instanceof ConflictException) {
			this.logger.warn(logMessage)
		} else {
			this.logger.error(logMessage)
		}

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: typeof message === 'string' ? message : message['message'],
		})
	}
}
