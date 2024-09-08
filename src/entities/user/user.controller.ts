import { HttpService } from '@nestjs/axios'
import { Controller, Get, Req } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom, Observable } from 'rxjs'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	MICROSERVICE_AUTH_URL = ''

	constructor(
		private readonly configService: ConfigService,
		private readonly service: UserService,
		private readonly httpService: HttpService
	) {
		this.MICROSERVICE_AUTH_URL = this.configService.get(
			'MICROSERVICE_AUTH_URL'
		)
	}

	@Get('profile')
	async getProfile(@Req() req) {
		return await firstValueFrom(
			this.httpService
				.get(`${this.MICROSERVICE_AUTH_URL}/users/profile`, {
					headers: {
						authorization: req.headers.authorization,
					},
				})
				.pipe(
					catchError((error: AxiosError, caught: Observable<any>) => {
						console.error(error)
						return caught
					})
				)
		).then(res => res.data)
	}
}
