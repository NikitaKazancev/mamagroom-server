import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { LoginDto, RegisterDto } from './auth.dto'
import { AuthService } from './auth.service'
import { GithubUser } from './oauth/github/github.service'
import { GoogleUser } from './oauth/google/google.service'

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

	@Post('login')
	async login(
		@Body() data: LoginDto,
		@Res({ passthrough: true }) res: Response
	) {
		return await this.service.login(data, res)
	}

	@Post('register')
	async register(
		@Body() data: RegisterDto,
		@Res({ passthrough: true }) res: Response
	) {
		return await this.service.register(data, res)
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.service.logout(res)
	}

	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth() {}

	@Get('github/redirect')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req: { user: GithubUser },
		@Res({ passthrough: true }) res: Response
	) {
		const userData = await this.service.loginOAuth(req.user, res)
		return res.redirect(
			`${this.CLIENT_OAUTH_REDIRECT_URL}?token=${userData.token}`
		)
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth() {}

	@Get('google/redirect')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(
		@Req() req: { user: GoogleUser },
		@Res({ passthrough: true }) res: Response
	) {
		const userData = await this.service.loginOAuth(req.user, res)
		return res.redirect(
			`${this.CLIENT_OAUTH_REDIRECT_URL}?token=${userData.token}`
		)
	}
}
