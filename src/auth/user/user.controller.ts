import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from '../decorators/auth.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get()
	async findMany(@Query() isDeleted?: boolean) {
		return await this.service.findMany({ isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Auth(Role.userPost)
	@Post()
	async create(@Body() data: UserDto) {
		return await this.service.create(data)
	}

	@Auth(Role.userPut)
	@Put(':id')
	async change(@Param('id') id: string, @Body() data: UserDto) {
		return await this.service.change(id, data)
	}

	@Auth(Role.userDelete)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
