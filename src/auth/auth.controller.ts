import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { GithubProfile, GoogleProfile } from './auth.types'

@Controller('auth')
export class AuthController {
	CLIENT_OAUTH_REDIRECT_URL = ''

	constructor(
		private readonly service: AuthService,
		private readonly configService: ConfigService
	) {
		this.CLIENT_OAUTH_REDIRECT_URL = this.configService.get(
			'CLIENT_OAUTH_REDIRECT_URL'
		)
	}

	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth() {}

	@Get('github/redirect')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req: { user: GithubProfile },
		@Res({ passthrough: true }) res: Response
	) {
		const user = await this.service.loginSocial(req)
		const { accessToken } = await this.service.buildResponseObject(user)

		return res.redirect(`${this.CLIENT_OAUTH_REDIRECT_URL}${accessToken}`)
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth() {}

	@Get('google/redirect')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(
		@Req() req: { user: GoogleProfile },
		@Res({ passthrough: true }) res: Response
	) {
		const user = await this.service.loginSocial(req)
		const { accessToken } = await this.service.buildResponseObject(user)

		return res.redirect(`${this.CLIENT_OAUTH_REDIRECT_URL}${accessToken}`)
	}
}
