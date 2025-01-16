import { Module } from '@nestjs/common'
import { KafkaModule } from 'src/kafka/kafka.module'
import { MyCacheService } from './my-cache.service'

@Module({
	providers: [MyCacheService],
	exports: [MyCacheService],
	imports: [KafkaModule],
})
export class MyCacheModule {}
