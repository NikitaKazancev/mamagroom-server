import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	findByEmail(email: string) {
		return this.prisma.user.findFirst({
			where: {
				email,
			},
		})
	}

	create(user: UserDto) {
		return this.prisma.user.create({
			data: {
				...user,
			},
		})
	}
}
