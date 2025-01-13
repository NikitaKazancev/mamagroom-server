import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Kafka, Producer } from 'kafkajs'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
	private kafka = new Kafka({
		clientId: 'nestjs-producer',
		brokers: ['kafka:9092'],
	})

	private producer: Producer

	async onModuleInit() {
		this.producer = this.kafka.producer()
		await this.producer.connect()
		console.log('Kafka Producer connected')
	}

	async resetCache() {
		await this.producer.send({
			topic: 'cache-clear-topic',
			messages: [{ value: 'reset-cache' }],
		})
		console.log(`Messages is sent by Kafka Producer`)
	}

	async onModuleDestroy() {
		await this.producer.disconnect()
	}
}
