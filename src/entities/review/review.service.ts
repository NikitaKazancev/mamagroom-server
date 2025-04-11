import { Injectable } from '@nestjs/common'
import { notFound } from 'src/utils/errors'
import { ReviewDto } from './review.dto'
import { ReviewRepository } from './review.repository'

@Injectable()
export class ReviewService {
	constructor(private readonly repository: ReviewRepository) {}

	async findMany() {
		const data = await this.repository.findMany()
		return data
	}

	async findById(id: string) {
		const data = await this.checkExistence(id)
		return data
	}

	async create(review: ReviewDto) {
		return await this.repository.create(review)
	}

	async change(id: string, review: ReviewDto) {
		return await this.repository.change(id, review)
	}

	async delete(id: string) {
		return await this.repository.delete(id)
	}

	async checkExistence(id: string) {
		if (!id) {
			notFound(`id is undefined`, ReviewService.name)
		}

		const review = await this.repository.findById(id)
		if (!review) {
			notFound(`review by id = ${id}`, ReviewService.name)
		}

		return review
	}
}
