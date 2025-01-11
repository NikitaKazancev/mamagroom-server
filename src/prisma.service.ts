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
			datasourceUrl: process.env.DATABASE_READ_URL,
			transactionOptions,
		})
	}
	async onModuleInit() {
		await this.$connect()
	}
}
