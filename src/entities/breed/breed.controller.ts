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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { Language } from 'src/utils/constants'
import { BreedDto } from './breed.dto'
import { BreedService } from './breed.service'

@Controller('breeds')
export class BreedController {
	constructor(private readonly service: BreedService) {}

	@Get()
	async findMany(@Query() language?: Language, @Query() isDeleted?: boolean) {
		return await this.service.findMany({ language, isDeleted })
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.breedPost)
	async create(@Body() data: BreedDto) {
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.breedPut)
	async change(@Param('id') id: string, @Body() data: BreedDto) {
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.breedDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}
}
