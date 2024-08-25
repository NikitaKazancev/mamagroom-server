import {
	forwardRef,
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ValidateValueIdMiddleware } from 'src/entities/values/utils/value.middlewares'
import { ValueModule } from 'src/entities/values/value.module'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { FILE_PATHS } from './utils/file.constants'

@Module({
	imports: [
		MulterModule.register({
			dest: './static',
		}),
		forwardRef(() => ValueModule),
	],
	controllers: [FileController],
	providers: [FileService],
	exports: [FileService],
})
export class FileModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ValidateValueIdMiddleware)
			.forRoutes({
				method: RequestMethod.POST,
				path: `files/${FILE_PATHS.values}`,
			})
	}
}
