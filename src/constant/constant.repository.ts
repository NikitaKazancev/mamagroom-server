import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'

@Injectable()
export class ConstantRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(filter: Partial<ConstantDimensionsDto>) {
		return this.prisma.constant.findMany({
			where: {
				...filter,
			},
		})
	}

	findUnique(filter: ConstantDimensionsDto) {
		return this.prisma.constant.findUnique({
			where: {
				language_type_name: filter,
			},
		})
	}

	create(constant: ConstantDto) {
		return this.prisma.constant.create({ data: constant })
	}

	change(filter: ConstantDimensionsDto, constant: ConstantDto) {
		return this.prisma.constant.update({
			where: {
				language_type_name: filter,
			},
			data: constant,
		})
	}

	delete(filter: ConstantDimensionsDto) {
		return this.prisma.constant.delete({
			where: {
				language_type_name: filter,
			},
		})
	}
}
