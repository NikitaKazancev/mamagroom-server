import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka, Producer } from 'kafkajs'
import { KAFKA_UID } from 'src/utils/constants'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
	private kafka = undefined
	private producer: Producer
	private nodeEnv: string
	private readonly logger = new Logger(KafkaProducerService.name)

	constructor(private readonly configService: ConfigService) {
		this.nodeEnv = this.configService.get('NODE_ENV')
		if (this.nodeEnv === 'development') {
			return
		}

		this.kafka = new Kafka({
			clientId: 'nestjs-producer',
			brokers: ['kafka:9092'],
		})
	}

	async onModuleInit() {
		if (this.nodeEnv === 'development') {
			return
		}

		this.producer = this.kafka.producer()
		await this.producer.connect()
	}

	async resetCache() {
		if (this.nodeEnv === 'development') {
			return
		}

		this.logger.log(
			`Sending request to clear cache... [${Date.now()}] [KAFKA_UID = ${KAFKA_UID}]`,
		)
		await this.producer.send({
			topic: 'cache-clear-topic',
			messages: [{ value: 'reset-cache' }],
		})
	}

	async onModuleDestroy() {
		if (this.nodeEnv === 'development') {
			return
		}

		await this.producer.disconnect()
	}
}
