/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { breedSeed } from '../src/entities/breed/utils/breed.seed'
// import { procedureSeed } from '../src/entities/procedure/utils/procedure.seed'

const prisma = new PrismaClient()
const catchError = async e => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
}

const main = async () => {
	try {
		// await procedureSeed(prisma)
		await breedSeed(prisma)
	} catch (e) {
		await catchError(e)
	}
}

main()
