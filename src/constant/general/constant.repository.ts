import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ConstantDto } from './dto/constant.dto'

@Injectable()
export class ConstantRepository {
	constructor(private readonly prisma: PrismaService) {}

	findOne(dto: Omit<ConstantDto, 'value'>) {
		return this.prisma.constant.findUnique({
			where: {
				language_type_name: {
					language: dto.language,
					type: dto.type,
					name: dto.name,
				},
			},
			select: {
				value: true,
			},
		})
	}

	findMany(
		filter: Omit<ConstantDto, 'value' | 'name'> & { names?: string[] }
	) {
		if (filter.names && filter.names.length) {
			return this.prisma.constant.findMany({
				where: {
					language: filter.language,
					type: filter.type,
					OR: filter.names.map(name => ({ name })),
				},
				select: {
					language: true,
					name: true,
					value: true,
				},
			})
		}

		return this.prisma.constant.findMany({
			where: {
				language: filter.language,
				type: filter.type,
			},
			select: {
				language: true,
				name: true,
				value: true,
			},
		})
	}

	createOne(data: ConstantDto) {
		return this.prisma.constant.create({
			data: {
				language: data.language,
				type: data.type,
				name: data.name,
				value: data.value,
			},
			select: {
				value: true,
			},
		})
	}

	createMany(data: ConstantDto[]) {
		return this.prisma.constant.createMany({
			data: data.map(item => ({
				language: item.language,
				type: item.type,
				name: item.name,
				value: item.value,
			})),
		})
	}

	changeOne(data: ConstantDto) {
		return this.prisma.constant.update({
			where: {
				language_type_name: {
					language: data.language,
					type: data.type,
					name: data.name,
				},
			},
			data: {
				value: data.value,
			},
			select: {
				value: true,
			},
		})
	}

	deleteOne(data: ConstantDto) {
		return this.prisma.constant.delete({
			where: {
				language_type_name: {
					language: data.language,
					type: data.type,
					name: data.name,
				},
			},
		})
	}
}
