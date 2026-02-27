import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { KafkaProducerService } from 'src/kafka/kafka.producer'
import { Cache } from 'src/types/extended-cache.interface'
import { KAFKA_UID } from 'src/utils/constants'

@Injectable()
export class MyCacheService {
	constructor(
		private readonly kafkaProducerService: KafkaProducerService,
		private readonly logger: Logger,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	async reset() {
		this.logger.log(
			`Clearing cache... [${Date.now()}] [KAFKA_UID = ${KAFKA_UID}]`,
		)
		await this.cacheManager.clear()
		await this.kafkaProducerService.resetCache()
	}
}
