import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

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

	await app.listen(8080)
}
bootstrap()
