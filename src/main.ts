import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { MyCacheService } from './cache/my-cache.service'
import { MyExceptionFilter } from './filters/exception.filter'
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
	app.useGlobalFilters(new MyExceptionFilter())
	app.useGlobalInterceptors(new ClearCacheInterceptor(app.get(MyCacheService)))

	const config = new DocumentBuilder()
		.setTitle('MamagrooM API')
		.setVersion('1.0')
		.build()
	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, documentFactory)

	await app.listen(8080)
}
bootstrap()
