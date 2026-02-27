import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Consumer, Kafka } from 'kafkajs'
import { Cache } from 'src/types/extended-cache.interface'
import { KAFKA_UID } from 'src/utils/constants'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
	private kafka = undefined
	private consumer: Consumer
	private nodeEnv: string
	private readonly logger = new Logger(KafkaConsumerService.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly configService: ConfigService,
	) {
		this.nodeEnv = this.configService.get('NODE_ENV')
		if (this.nodeEnv === 'development') {
			return
		}

		this.kafka = new Kafka({
			clientId: `nestjs-consumer-${KAFKA_UID}`,
			brokers: ['kafka:9092'],
		})
	}

	async onModuleInit() {
		if (this.nodeEnv === 'development') {
			return
		}

		const groupId = `nestjs-group-${uuidv4()}`
		this.consumer = this.kafka.consumer({ groupId })

		await this.consumer.connect()

		await this.consumer.subscribe({
			topic: 'cache-clear-topic',
			fromBeginning: false,
		})

		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				this.logger.log(
					`Received request to clear cache... [${Date.now()}] [KAFKA_UID = ${KAFKA_UID}]`,
				)
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
