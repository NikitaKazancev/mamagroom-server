import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { FindManyFilter } from 'src/utils/dtos'
import { conflict, notFound } from 'src/utils/errors'
import { UserDto } from './user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
	constructor(private readonly repository: UserRepository) {}

	async findMany(filter: FindManyFilter) {
		return await this.repository.findMany(filter)
	}

	async findById(id: string) {
		return await this.checkExistence(id)
	}

	async findByEmail(email: string) {
		return await this.repository.findByEmail(email)
	}

	async findOrCreate(user: UserDto) {
		const userInDb = await this.findByEmail(user.email)
		if (userInDb) {
			return userInDb
		}

		user.password = await hash(user.password)
		return await this.repository.create(user)
	}

	async create(user: UserDto) {
		await this.checkUniqFields(user)

		user.password = await hash(user.password)

		return await this.repository.create(user)
	}

	async change(id: string, user: UserDto) {
		const userInDb = await this.checkExistence(id)
		if (userInDb.email !== user.email) {
			await this.checkUniqFields(user)
		}

		user.password = await hash(user.password)

		return await this.repository.change(id, user)
	}

	async delete(id: string) {
		await this.checkExistence(id)

		return await this.repository.markToDelete(id)
	}

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

	private async checkUniqFields(user: UserDto) {
		const userInDb = await this.repository.findByEmail(user.email)

		if (userInDb) {
			conflict(`user by email = ${user.email}`, UserService.name)
		}

		return userInDb
	}
}
