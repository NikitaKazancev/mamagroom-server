/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'
import { breedSeed } from 'src/entities/breed/utils/breed.seed'
import { headerNavbarLinkSeed } from 'src/entities/header-navbar-link/utils/header-navbar-link.seed'
import { mainSliderSeed } from 'src/entities/main-slider/utils/main-slider.seed'
import { masterSeed } from 'src/entities/master/utils/master.seed'
import { vacancySeed } from 'src/entities/vacancy/utils/vacancy.seed'
import { valueSeed } from 'src/entities/value/utils/value.seed'

const prisma = new PrismaClient()

const main = async () => {
	try {
		await breedSeed(prisma)
		console.log('breed seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await headerNavbarLinkSeed(prisma)
		console.log('headerNavbarLink seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await mainSliderSeed(prisma)
		console.log('mainSlider seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await masterSeed(prisma)
		console.log('master seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await vacancySeed(prisma)
		console.log('vacancy seeded')
	} catch (e) {
		console.error(e)
	}

	try {
		await valueSeed(prisma)
		console.log('value seeded')
	} catch (e) {
		console.error(e)
	}
}

main()
