import { Injectable } from '@nestjs/common'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { UserDto } from './user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, UserService.name)
		}

		const user = await this.repository.findById(id)
		if (!user) {
			notFound(`user by id = ${id}`, UserService.name)
		}

		return user
	}

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async findByEmail(email: string) {
		const res = await this.repository.findByEmail(email)
		return { ...res, roles: res.roles.map(role => role.role) }
	}

	async findOrCreate(user: UserDto) {
		const userInDb = await this.findByEmail(user.email)
		if (userInDb) {
			return userInDb
		}

		const createdUser = await this.repository.create(user)
		return { ...createdUser, roles: [] }
	}

	async create(user: UserDto) {
		const userInDb = await this.findByEmail(user.email)

		if (userInDb) {
			conflict(`user by email = ${user.email}`, UserService.name)
		}

		return await this.repository.create(user)
	}

	async change(id: string, user: UserDto) {
		await this.checkExistence(id)

		return await this.repository.change(id, user)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}
}
