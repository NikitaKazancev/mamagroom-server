import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { badRequest, notFound } from 'src/utils/errors'
import { ValueRepository } from '../value.repository'

@Injectable()
export class ValidateValueIdMiddleware implements NestMiddleware {
	constructor(private readonly valueRepository: ValueRepository) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const id = req.query.id
		if (typeof id !== 'string' || !id) {
			badRequest('Value ID', ValidateValueIdMiddleware.name)
		}

		const value = await this.valueRepository.findOne({
			id: id as string,
		})

		if (!value) {
			notFound('Value ID', ValidateValueIdMiddleware.name)
		}

		next()
	}
}
