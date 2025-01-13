import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common'
import { Consumer, Kafka } from 'kafkajs'
import { v4 as uuidv4 } from 'uuid' // Установите библиотеку uuid

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
	private kafka = new Kafka({
		clientId: `nestjs-consumer-${uuidv4()}`, // Уникальный clientId
		brokers: ['kafka:9092'],
	})

	private consumer: Consumer

	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	async onModuleInit() {
		const groupId = `nestjs-group-${uuidv4()}` // Уникальный groupId
		this.consumer = this.kafka.consumer({ groupId })

		await this.consumer.connect()
		console.log(`Kafka Consumer connected with groupId: ${groupId}`)

		await this.consumer.subscribe({
			topic: 'cache-clear-topic',
			fromBeginning: true,
		})

		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				await this.cacheManager.reset()
				console.log(
					`Cache cleared with Kafka message: ${message.value?.toString()}`
				)
			},
		})
	}

	async onModuleDestroy() {
		await this.consumer.disconnect()
	}
}
