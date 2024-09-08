import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { VerifyCallback } from 'passport-google-oauth20'
import { GithubProfile } from '../auth.types'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GITHUB_OAUTH_CLIENT_ID'),
			clientSecret: configService.get('GITHUB_OAUTH_CLIENT_SECRET'),
			callbackURL: configService.get('GITHUB_OAUTH_CALLBACK_URL'),
			scope: ['user:email'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback
	): Promise<any> {
		const { username, emails } = profile
		const user: GithubProfile = {
			email: emails[0].value,
			username,
			accessToken,
		}
		done(null, user)
	}
}
