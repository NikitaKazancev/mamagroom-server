import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Consumer, Kafka } from 'kafkajs'
import { Cache } from 'src/types/extended-cache.interface'

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
	private kafka = undefined
	private consumer: Consumer
	private nodeEnv: string

	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly configService: ConfigService,
	) {
		this.nodeEnv = this.configService.get('NODE_ENV')
		if (this.nodeEnv === 'development') {
			return
		}

		this.kafka = new Kafka({
			clientId: `nestjs-cache-group`,
			brokers: ['kafka:9092'],
		})
	}

	async onModuleInit() {
		if (this.nodeEnv === 'development') {
			return
		}

		const groupId = `nestjs-cache-group`
		this.consumer = this.kafka.consumer({ groupId })

		await this.consumer.connect()

		await this.consumer.subscribe({
			topic: 'cache-clear-topic',
			fromBeginning: false,
		})

		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				await this.cacheManager.clear()
			},
		})
	}

	async onModuleDestroy() {
		if (this.nodeEnv === 'development') {
			return
		}

		await this.consumer.disconnect()
	}
}
