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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { OptionalParseBoolPipe } from 'src/pipes/optional-parse-bool.pipe'
import { type Language } from 'src/utils/constants'
import { getMemStart, logUsedMemory } from 'src/utils/functions'
import { BreedDto } from './breed.dto'
import { BreedService } from './breed.service'

@Controller('breeds')
@UseInterceptors(CacheInterceptor)
export class BreedController {
	constructor(private readonly service: BreedService) {}

	@Get()
	async findMany(
		@Query('language') language?: Language,
		@Query('isDeleted', OptionalParseBoolPipe) isDeleted?: boolean,
		@Query('type') type?: 'dogs' | 'cats'
	) {
		const memStart = getMemStart()
		const response = await this.service.findMany({
			language,
			isDeleted,
			type,
		})
		logUsedMemory(memStart, 'findMany breeds')
		return response
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
