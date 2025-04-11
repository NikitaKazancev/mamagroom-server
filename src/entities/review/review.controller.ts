import { CacheInterceptor } from '@nestjs/cache-manager'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UseInterceptors } from '@nestjs/common/decorators'
import { Role } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
@UseInterceptors(CacheInterceptor)
export class ReviewController {
	constructor(private readonly service: ReviewService) {}

	@Get()
	async findMany() {
		return await this.service.findMany()
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id)
	}

	@Post()
	@Auth(Role.reviewPost)
	async create(@Body() data: ReviewDto) {
		this.castDataPropsTypes(data)
		return await this.service.create(data)
	}

	@Put(':id')
	@Auth(Role.reviewPut)
	async change(@Param('id') id: string, @Body() data: ReviewDto) {
		this.castDataPropsTypes(data)
		return await this.service.change(id, data)
	}

	@Delete(':id')
	@Auth(Role.reviewDelete)
	async delete(@Param('id') id: string) {
		return await this.service.delete(id)
	}

	private castDataPropsTypes(data: ReviewDto) {
		data.date = new Date(data.date)
	}
}
