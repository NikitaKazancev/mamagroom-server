import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FindManyFilter } from 'src/utils/dtos'
import { UserDto } from './user.dto'

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: FindManyFilter & { email?: string }) {
		return this.prisma.user.findMany({
			where: {
				...filter,
			},
		})
	}

	findById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
		})
	}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		})
	}

	create(user: UserDto) {
		return this.prisma.user.create({
			data: user,
		})
	}

	change(id: string, user: UserDto) {
		return this.prisma.user.update({
			where: {
				id,
			},
			data: user,
		})
	}

	markToDelete(id: string) {
		return this.prisma.user.update({
			where: {
				id,
			},
			data: { isDeleted: true },
		})
	}
}
