import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FilterDto } from 'src/utils/dtos'
import { ValueDto } from './dto/value.dto'

@Injectable()
export class ValueRepository {
	constructor(private readonly prisma: PrismaService) {}

	findOne(filter: FilterDto) {
		return this.prisma.value.findFirst({
			where: {
				...filter,
			},
		})
	}

	findMany(filter: FilterDto) {
		return this.prisma.value.findMany({
			where: {
				...filter,
			},
			orderBy: {
				order: 'asc',
			},
			select: {
				id: true,
				title: true,
				description: true,
				imageName: true,
			},
		})
	}

	change(id: string, dto: ValueDto) {
		return this.prisma.value.update({
			data: { ...dto },
			where: { id },
			select: {
				id: true,
			},
		})
	}

	changeImageName(oldImageName: string, newImageName: string) {
		return this.prisma.value.updateMany({
			where: {
				imageName: oldImageName,
			},
			data: {
				imageName: newImageName,
			},
		})
	}
}
