import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common'
import { Consumer, Kafka } from 'kafkajs'

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
	private kafka = new Kafka({
		clientId: 'nestjs-consumer',
		brokers: ['kafka:9092'],
	})

	private consumer: Consumer

	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	async onModuleInit() {
		this.consumer = this.kafka.consumer({ groupId: 'nestjs-group' })
		await this.consumer.connect()
		console.log('Kafka Consumer connected')

		await this.consumer.subscribe({
			topic: 'cache-clear-topic',
			fromBeginning: true,
		})

		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				const cacheKey = message.value.toString()
				console.log(`Received message from topic ${topic}: ${cacheKey}`)

				await this.cacheManager.reset()
				console.log(`Cache cleared for key: ${cacheKey}`)
			},
		})
	}

	async onModuleDestroy() {
		await this.consumer.disconnect()
	}
}
