import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileExtension } from 'src/utils/functions'
import { sanitizeFilename } from './file.functions'

export const SaveFileByName = ({
	name,
	folder,
}: {
	name?: string
	folder?: string
}) => {
	return FileInterceptor('file', {
		storage: diskStorage({
			destination: folder ? `./static/${folder}` : './static',
			filename: (req, file, cb) => {
				const originalFileName = sanitizeFilename(file.originalname)
				const ext = fileExtension(originalFileName)
				cb(null, `${name || originalFileName}.${ext}`)
			},
		}),
	})
}
