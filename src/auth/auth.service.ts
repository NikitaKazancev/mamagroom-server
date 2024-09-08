import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UserService } from 'src/entities/user/user.service'
import { SocialProfile } from './auth.types'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwt: JwtService
	) {}

	async loginSocial(req: { user: SocialProfile }) {
		if (!req.user) {
			throw new BadRequestException('User not found by social media')
		}

		return this.userService.findOrCreateSocial(req.user)
	}

	async buildResponseObject(user: User) {
		const tokens = await this.issueTokens(user.email)
		return { user, ...tokens }
	}

	private async issueTokens(email: string) {
		const accessToken = this.jwt.sign(
			{ email },
			{
				expiresIn: '1h',
			}
		)
		return { accessToken }
	}
}
