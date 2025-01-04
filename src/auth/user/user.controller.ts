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

	@Post()
	async create(@Body() data: UserDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	async change(@Param('id') id: string, @Body() data: UserDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
