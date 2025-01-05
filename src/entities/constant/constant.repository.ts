import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ConstantDimensionsDto, ConstantDto } from './constant.dto'

@Injectable()
export class ConstantRepository {
	constructor(private readonly prisma: PrismaService) {}

	findMany(dimensions: Partial<ConstantDimensionsDto>) {
		return this.prisma.constant.findMany({
			where: {
				...dimensions,
			},
		})
	}

	findUnique(dimensions: ConstantDimensionsDto) {
		return this.prisma.constant.findUnique({
			where: {
				language_type_name: dimensions,
			},
		})
	}

	create(constant: ConstantDto) {
		return this.prisma.constant.create({ data: constant })
	}

	change(dimensions: ConstantDimensionsDto, constant: ConstantDto) {
		return this.prisma.constant.update({
			where: {
				language_type_name: dimensions,
			},
			data: constant,
		})
	}

	delete(dimensions: ConstantDimensionsDto) {
		return this.prisma.constant.delete({
			where: {
				language_type_name: dimensions,
			},
		})
	}
}
