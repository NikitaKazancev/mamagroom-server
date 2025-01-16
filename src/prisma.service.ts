import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const transactionOptions = {
	maxWait: 5000,
	timeout: 10000,
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			transactionOptions,
		})
	}
	async onModuleInit() {
		await this.$connect()
	}
}

@Injectable()
export class PrismaReadService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			datasourceUrl:
				process.env.NODE_ENV === 'production'
					? process.env.DATABASE_READ_URL
					: process.env.DATABASE_MAIN_URL,
			transactionOptions,
		})
	}
	async onModuleInit() {
		await this.$connect()
	}
}
