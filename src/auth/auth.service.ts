import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { verify } from 'argon2'
import { Response } from 'express'
import { UserService } from 'src/auth/user/user.service'
import { notFound, unauthorized } from 'src/utils/errors'
import { LoginDto, RegisterDto } from './auth.dto'
import { GithubService, GithubUser } from './oauth/github/github.service'
import { GoogleService, GoogleUser } from './oauth/google/google.service'

export type OAuthUser = GoogleUser | GithubUser

@Injectable()
export class AuthService {
	private readonly tokenConfig: {
		name: string
		expirationDays: number
		httpOnly: boolean
		domain: string
		secure: boolean
		sameSite: boolean | 'lax' | 'strict' | 'none'
	} = {
		name: 'token',
		expirationDays: 7,
		httpOnly: true,
		domain: '',
		secure: true,
		sameSite: 'lax',
	}

	constructor(
		private readonly userService: UserService,
		private readonly githubService: GithubService,
		private readonly googleService: GoogleService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {
		this.tokenConfig.domain = configService.get('DOMAIN')
	}

	async login(data: LoginDto, res: Response) {
		const user = await this.userService.findByEmail(data.email)
		if (!user) notFound('user is not found', AuthService.name)

		const passwordCorrect = await verify(user.password, data.password)
		if (!passwordCorrect) {
			return unauthorized('password is incorrect', AuthService.name)
		}

		return this.withNewToken(user, res)
	}

	async register(data: RegisterDto, res: Response) {
		const createdUser = await this.userService.create({ ...data, roles: [] })
		return this.withNewToken(createdUser, res)
	}

	logout(res: Response) {
		res.clearCookie(this.tokenConfig.name, {
			httpOnly: this.tokenConfig.httpOnly,
			domain: this.tokenConfig.domain,
			secure: this.tokenConfig.secure,
			sameSite: this.tokenConfig.sameSite,
		})
	}

	async loginOAuth(user: OAuthUser, res: Response) {
		if (!user) unauthorized('user is undefined by oauth', AuthService.name)

		let userDto = undefined
		if (this.googleService.isGoogleUser(user)) {
			userDto = this.googleService.convertToGeneralUser(user)
		} else if (this.githubService.isGithubUser(user)) {
			userDto = this.githubService.convertToGeneralUser(user)
		}

		const userInDb = await this.userService.findOrCreate(userDto)
		return this.withNewToken(userInDb, res)
	}

	private withNewToken(userData: User & { roles: string[] }, res: Response) {
		const token = this.newToken(userData.email, userData.roles)

		res.cookie(this.tokenConfig.name, token, {
			expires: new Date(
				Date.now() + this.tokenConfig.expirationDays * 24 * 60 * 60 * 1000
			),
			httpOnly: this.tokenConfig.httpOnly,
			domain: this.tokenConfig.domain,
			secure: this.tokenConfig.secure,
			sameSite: this.tokenConfig.sameSite,
		})

		return {
			...userData,
			token,
		}
	}

	private newToken(email: string, roles: string[]) {
		return this.jwtService.sign(
			{ email, roles },
			{
				expiresIn: `${this.tokenConfig.expirationDays}d`,
			}
		)
	}
}
