import { CacheInterceptor } from '@nestjs/cache-manager'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { Auth } from '../decorators/auth.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get()
	@Auth(Role.userGet)
	async findMany(
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean
	) {
		return await this.service.findMany({ isDeleted })
	}

	@Get(':id')
	@Auth(Role.userGet)
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.userPost)
	async create(@Body() data: UserDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.userPut)
	async change(@Param('id') id: string, @Body() data: UserDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.userDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
