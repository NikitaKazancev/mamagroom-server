import { PrismaClient } from '@prisma/client'

/* eslint-disable no-console */
export const constantsSeed = async (prisma: PrismaClient) => {
	prisma.constant.create({
		data: {
			name: 'header_nav_links',
			value: JSON.stringify([{ name: 'Home', link: '/' }]),
		},
	})
}
