import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common'
import { Kafka, Producer } from 'kafkajs'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	private kafka = new Kafka({
		clientId: 'nestjs-producer',
		brokers: ['kafka:9092'],
	})

	private producer: Producer

	async onModuleInit() {
		this.producer = this.kafka.producer()
		await this.producer.connect()
	}

	async resetCache() {
		await this.cacheManager.reset()
		console.log(Date.now(), 'cache cleared locally')
		await this.producer.send({
			topic: 'cache-clear-topic',
			messages: [{ value: 'reset-cache' }],
		})
	}

	async onModuleDestroy() {
		await this.producer.disconnect()
	}
}
