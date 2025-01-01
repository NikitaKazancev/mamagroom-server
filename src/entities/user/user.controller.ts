import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly service: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('email') email: string) {
		return this.service.findByEmail(email)
	}
}
