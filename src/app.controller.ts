import { Controller, Delete } from '@nestjs/common'
import { Role } from '@prisma/client'
import { Auth } from './auth/decorators/auth.decorator'
import { PrismaService } from './prisma.service'

@Controller()
export class AppController {
	constructor(private readonly prisma: PrismaService) {}

	@Delete('delete-marked-for-deletion')
	@Auth(Role.deleteMarkedForDeletion)
	async deleteMarkedForDeletion() {
		await this.prisma.$transaction([
			this.prisma.procedure.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.breed.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.headerNavbarLink.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.mainSlider.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.master.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.price.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.user.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.vacancy.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
			this.prisma.value.deleteMany({
				where: {
					isDeleted: true,
				},
			}),
		])
	}
}
