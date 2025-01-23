import { Injectable } from '@nestjs/common'
import { type OAuthUser } from 'src/auth/auth.service'
import { UserDto } from 'src/auth/user/user.dto'

export interface YandexUser {
	email: string
	username: string
	accessToken: string
}

@Injectable()
export class YandexService {
	isYandexUser(user: OAuthUser): user is YandexUser {
		return 'username' in user
	}

	convertToGeneralUser(user: YandexUser): UserDto {
		return {
			email: user.email,
			name: user.username,
			password: '',
		}
	}
}
