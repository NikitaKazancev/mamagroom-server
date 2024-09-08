import { Injectable } from '@nestjs/common'
import { FILE_PATHS } from 'src/file/utils/file.constants'
import { PrismaService } from 'src/prisma.service'
import { FilterDto } from 'src/utils/dtos'
import { notFound } from 'src/utils/errors'
import { ValueDto } from './dto/value.dto'
import { ValueRepository } from './value.repository'

@Injectable()
export class ValueService {
	constructor(
		private readonly repository: ValueRepository,
		private readonly prisma: PrismaService
	) {}

	async findOne(filter: FilterDto) {
		return this.repository.findOne(filter)
	}

	async findMany(filter: FilterDto) {
		let data = await this.repository.findMany(filter)
		data = data.map(value => ({
			...value,
			imageName: `/static/${FILE_PATHS.values}/${value.imageName}`,
		}))

		return data
	}

	async change(id: string, dto: ValueDto, file: Express.Multer.File) {
		return await this.prisma.$transaction(async () => {
			if (file) {
				let res: {
					id: string
				}
				const dbData = await this.repository.findOne({ id })

				try {
					res = await this.repository.change(id, dto)
				} catch (error) {
					notFound(error, ValueService.name, dbData.language)
				}

				if (dbData.imageName !== file.filename) {
					await this.repository.changeImageName(
						dbData.imageName,
						file.filename
					)
				}

				return res
			}
		})
	}
}
