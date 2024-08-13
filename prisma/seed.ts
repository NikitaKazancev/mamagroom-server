/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { constantsSeed } from 'src/constant/utils/constant.seed'
// import { procedureSeed } from '../src/entities/procedure/utils/procedure.seed'

const prisma = new PrismaClient()

const main = async () => {
	try {
		// await procedureSeed(prisma)
		await constantsSeed(prisma)
	} catch (e) {
		console.error(e)
	}
}

main()
