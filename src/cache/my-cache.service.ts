import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { KafkaProducerService } from 'src/kafka/kafka.producer'
import { Cache } from 'src/types/extended-cache.interface'

@Injectable()
export class MyCacheService {
	constructor(
		private readonly kafkaProducerService: KafkaProducerService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async reset() {
		await this.cacheManager.clear()
		await this.kafkaProducerService.resetCache()
	}
}
