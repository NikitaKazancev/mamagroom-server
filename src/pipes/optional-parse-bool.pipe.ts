import { PipeTransform } from '@nestjs/common'
import { badRequest } from 'src/utils/errors'

export class OptionalParseBoolPipe implements PipeTransform {
	transform(value: any): boolean | undefined {
		if (value === undefined) return undefined

		if (value === 'true' || value === 'false') {
			return value === 'true'
		}

		badRequest(`value must be 'true' or 'false'`, OptionalParseBoolPipe.name)
	}
}
