import { Injectable } from '@nestjs/common'
import { OAuthUser } from 'src/auth/auth.service'
import { UserDto } from 'src/auth/user/user.dto'

export interface GoogleUser {
	email: string
	firstName: string
	lastName: string
	accessToken: string
}

@Injectable()
export class GoogleService {
	isGoogleUser(user: OAuthUser): user is GoogleUser {
		return 'firstName' in user && 'lastName' in user
	}

	convertToGeneralUser(user: GoogleUser): UserDto {
		return {
			email: user.email,
			name: `${user.firstName} ${user.lastName}`,
			password: '',
			roles: [],
		}
	}
}
