import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UserService } from 'src/auth/user/user.service'
import { badRequest } from 'src/utils/errors'
import { GithubService, GithubUser } from './oauth/github/github.service'
import { GoogleService, GoogleUser } from './oauth/google/google.service'

export type SocialUser = GoogleUser | GithubUser

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly githubService: GithubService,
		private readonly googleService: GoogleService,
		private readonly jwtService: JwtService
	) {}

	async loginSocial(user: SocialUser) {
		if (!user)
			badRequest('user is undefined by social media', AuthService.name)

		let userDto = undefined
		if (this.googleService.isGoogleUser(user)) {
			userDto = this.googleService.convertToGeneralUser(user)
		} else if (this.githubService.isGithubUser(user)) {
			userDto = this.githubService.convertToGeneralUser(user)
		}

		const userInDb = await this.userService.findOrCreate(userDto)
		return this.withNewToken(userInDb)
	}

	withNewToken(userData: User & { roles: string[] }) {
		return {
			...userData,
			token: this.newToken(userData.email, userData.roles),
		}
	}

	private newToken(email: string, roles: string[]) {
		return this.jwtService.sign(
			{ email, roles },
			{
				expiresIn: '7d',
			}
		)
	}
}
