import {
	BadRequestException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common'
import { prefix } from './functions'

export const notFound = (message: string, className: string, lang?: string) => {
	throw new NotFoundException(`${prefix(className, lang)} ${message}`)
}

export const conflict = (message: string, className: string, lang?: string) => {
	throw new ConflictException(`${prefix(className, lang)} ${message}`)
}

export const badRequest = (
	message: string,
	className: string,
	lang?: string
) => {
	throw new BadRequestException(`${prefix(className, lang)} ${message}`)
}
