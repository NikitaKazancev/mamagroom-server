import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { MyCacheService } from './cache/my-cache.service'
import { ClearCacheInterceptor } from './interceptors/clear-cache.interceptor'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ['http://localhost', 'https://mamagroom.ru'],
		credentials: true,
		exposedHeaders: ['set-cookie'],
	})
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		})
	)

	app.useGlobalInterceptors(new ClearCacheInterceptor(app.get(MyCacheService)))

	await app.listen(8080)
}
bootstrap()
