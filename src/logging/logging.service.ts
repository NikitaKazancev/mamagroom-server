import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom, Observable } from 'rxjs'
import { LogDto, LogType } from './dto/logging.dto'

@Injectable()
export class LoggingService {
	MICROSERVICE_LOGGING_URL = ''

	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {
		this.MICROSERVICE_LOGGING_URL = this.configService.get(
			'MICROSERVICE_LOGGING_URL'
		)
	}

	save(log: LogDto) {
		return this.httpService.post(this.MICROSERVICE_LOGGING_URL, log).pipe(
			catchError((error: AxiosError, caught: Observable<any>) => {
				console.error(error)
				return caught
			})
		)
	}

	async findAllBy({ type, key }: { type: LogType; key?: string }) {
		return await firstValueFrom(
			this.httpService
				.get(this.MICROSERVICE_LOGGING_URL, {
					params: { type, key },
				})
				.pipe(
					catchError((error: AxiosError, caught: Observable<any>) => {
						console.error(error)
						return caught
					})
				)
		)
	}
}
