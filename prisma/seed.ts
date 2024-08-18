/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { pagesHomeSeed } from 'src/constant/pages/home/utils/pages-home.seed'
import { headerNavbarLinksSeed } from 'src/entities/header-navbar-link/utils/header-navbar-links.seed'

const prisma = new PrismaClient()

const main = async () => {
	try {
		await headerNavbarLinksSeed(prisma)
		console.log('headerNavbarLinks seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await pagesHomeSeed(prisma)
		console.log('pagesHomeSeed seeded')
	} catch (e) {
		console.error(e)
	}
}

main()
