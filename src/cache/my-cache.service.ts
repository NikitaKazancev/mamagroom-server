import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { KafkaProducerService } from 'src/kafka/kafka.producer'

@Injectable()
export class MyCacheService {
	constructor(
		private readonly kafkaProducerService: KafkaProducerService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async reset() {
		await this.cacheManager.reset()
		await this.kafkaProducerService.resetCache()
	}
}
