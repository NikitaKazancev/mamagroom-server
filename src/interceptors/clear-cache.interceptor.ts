import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	UseInterceptors,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { MyCacheService } from 'src/cache/my-cache.service'

@Injectable()
export class ClearCacheInterceptor implements NestInterceptor {
	constructor(private readonly cacheService: MyCacheService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest()

		const method = request.method
		if (['POST', 'PUT', 'DELETE'].includes(method)) {
			return next.handle().pipe(
				tap(async () => {
					await this.cacheService.reset()
				})
			)
		}

		return next.handle()
	}
}

export function ClearCache() {
	return UseInterceptors(ClearCacheInterceptor)
}
