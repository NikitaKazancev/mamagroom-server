import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	UseInterceptors,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { KafkaProducerService } from 'src/kafka/kafka.producer'

@Injectable()
export class ClearCacheInterceptor implements NestInterceptor {
	constructor(private readonly kafkaProducerService: KafkaProducerService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			tap(async () => {
				await this.kafkaProducerService.resetCache()
			})
		)
	}
}

export function ClearCache() {
	return UseInterceptors(ClearCacheInterceptor)
}
