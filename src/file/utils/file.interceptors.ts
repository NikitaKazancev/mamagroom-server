import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileExtension } from 'src/utils/functions'
import { sanitizeFilename } from './file.functions'

export const SaveFile = ({
	name,
	folder,
	byId,
}: {
	name?: string
	folder?: string
	byId?: boolean
}) => {
	return FileInterceptor('file', {
		storage: diskStorage({
			destination: folder ? `./static/${folder}` : './static',
			filename: (req, file, cb) => {
				const originalFileName = sanitizeFilename(file.originalname)
				const ext = fileExtension(originalFileName)

				const fileName = byId ? req.query.id : name || originalFileName
				cb(null, `${fileName}.${ext}`)
			},
		}),
	})
}
