import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'argon2'

export const userSeed = async (prisma: PrismaClient) => {
	await prisma.user.create({
		data: {
			email: 'my@nikita-kazantsev.ru',
			name: 'Nikita Kazantsev',
			password: await hash(process.env.ADMIN_PASSWORD),
			roles: [Role.fullAccess],
		},
	})

	await prisma.user.create({
		data: {
			email: 'user@ya.ru',
			name: 'Test User',
			password: await hash('123'),
			roles: [Role.postBreed],
		},
	})
}
