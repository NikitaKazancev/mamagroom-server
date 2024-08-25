/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { constantSeed } from 'src/constant/utils/constant.seed'
import { headerNavbarLinksSeed } from 'src/entities/header-navbar-link/utils/header-navbar-links.seed'
import { valuesSeed } from 'src/entities/values/utils/value.seed'

const prisma = new PrismaClient()

const main = async () => {
	try {
		await headerNavbarLinksSeed(prisma)
		console.log('headerNavbarLinks seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await constantSeed(prisma)
		console.log('constantSeed seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await valuesSeed(prisma)
		console.log('valuesSeed seeded')
	} catch (e) {
		console.error(e)
	}
}

main()
