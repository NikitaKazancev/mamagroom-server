import { PrismaClient, Role } from '@prisma/client'

export const userSeed = async (prisma: PrismaClient) => {
	await prisma.user.create({
		data: {
			email: 'my@nikita-kazantsev.ru',
			name: 'Nikita Kazantsev',
			password: process.env.ADMIN_PASSWORD,
			roles: {
				create: {
					role: Role.fullAccess,
				},
			},
		},
	})

	await prisma.user.create({
		data: {
			email: 'user@ya.ru',
			name: 'Test User',
			password: '123',
			roles: {
				create: [{ role: Role.postBreed }],
			},
		},
	})
}
