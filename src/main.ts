import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		httpsOptions: {
			// cert: readFileSync('./secrets/www_mamagroom_ru.pem'),
			// key: readFileSync('./secrets/www_mamagroom_ru-key.pem'),
			// ca: readFileSync('./secrets/www_mamagroom_ru-ca.pem'),
			rejectUnauthorized: false,
		},
	})

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: [
			'http://localhost',
			'http://mamagroom.ru',
			'https://mamagroom.ru',
			'http://mamagroom.ru:443',
			'https://mamagroom.ru:443',
			'http://www.myhost.local',
			'https://www.myhost.local',
			'https://www.myhost.local:443',
		],
		credentials: true,
		exposedHeaders: ['set-cookie'],
	})
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(8080)
}
bootstrap()
