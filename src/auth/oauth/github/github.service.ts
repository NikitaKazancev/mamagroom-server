import { Injectable } from '@nestjs/common'
import { type OAuthUser } from 'src/auth/auth.service'
import { UserDto } from 'src/auth/user/user.dto'

export interface GithubUser {
	email: string
	username: string
	accessToken: string
}

@Injectable()
export class GithubService {
	isGithubUser(user: OAuthUser): user is GithubUser {
		return 'username' in user
	}

	convertToGeneralUser(user: GithubUser): UserDto {
		return {
			email: user.email,
			name: user.username,
			password: '',
		}
	}
}
