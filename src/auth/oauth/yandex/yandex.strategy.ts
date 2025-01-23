import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-yandex'
import { YandexUser } from './yandex.service'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private configService: ConfigService) {
		super({
			clientID: configService.get('YANDEX_OAUTH_CLIENT_ID'),
			clientSecret: configService.get('YANDEX_OAUTH_CLIENT_SECRET'),
			callbackURL: configService.get('YANDEX_OAUTH_CALLBACK_URL'),
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: any
	): Promise<any> {
		const { username, emails } = profile

		const user: YandexUser = {
			email: emails[0].value,
			username,
			accessToken,
		}

		done(null, user)
	}
}
