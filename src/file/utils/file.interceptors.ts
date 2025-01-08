import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileExtension } from 'src/utils/functions'
import { v4 as uuidv4 } from 'uuid'
import { FileName, FilePath } from './file.constants'
import { sanitizeFilename } from './file.functions'

export const SaveFile = ({
	name,
	path,
	byId,
}: {
	name?: FileName
	path?: FilePath
	byId?: boolean
}) => {
	return FileInterceptor('file', {
		storage: diskStorage({
			destination: path ? `./static/${path}` : './static',
			filename: (req, file, cb) => {
				const originalFileName = sanitizeFilename(file.originalname)
				const ext = fileExtension(originalFileName)

				const fileName = byId ? req.query.id : name || originalFileName
				const uuid = uuidv4()
				cb(null, `${fileName}_${uuid}.${ext}`)
			},
		}),
	})
}
