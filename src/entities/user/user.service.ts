import { Injectable } from '@nestjs/common'
import { SocialProfile } from 'src/auth/auth.types'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	async findByEmail(email: string) {
		return await this.repository.findByEmail(email)
	}

	async findOrCreateSocial(profile: SocialProfile) {
		const user = await this.repository.findByEmail(profile.email)
		if (user) {
			return user
		}

		const name =
			'firstName' in profile
				? `${profile.firstName} ${profile.lastName}`
				: profile.username

		return await this.repository.create({
			email: profile.email,
			name,
			password: '',
		})
	}
}
