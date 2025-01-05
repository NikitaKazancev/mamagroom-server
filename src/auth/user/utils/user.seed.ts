import { PrismaClient, Role } from '@prisma/client'
import { hash } from 'argon2'

export const userSeed = async (prisma: PrismaClient) => {
	let userData: {
		email: string
		name: string
		password: string
		roles: Role[]
	} = {
		email: 'my@nikita-kazantsev.ru',
		name: 'Nikita Kazantsev',
		password: await hash(process.env.ADMIN_PASSWORD),
		roles: [Role.fullAccess],
	}
	await prisma.user.upsert({
		where: { email: 'my@nikita-kazantsev.ru' },
		update: userData,
		create: userData,
	})

	userData = {
		email: 'user@ya.ru',
		name: 'Test User',
		password: await hash('123'),
		roles: [Role.breedPost],
	}
	await prisma.user.upsert({
		where: { email: 'user@ya.ru' },
		update: userData,
		create: userData,
	})
}
