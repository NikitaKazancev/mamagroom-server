import { PipeTransform } from '@nestjs/common'
import { badRequest } from 'src/utils/errors'

export class OptionalParseNumberPipe implements PipeTransform {
	transform(value: any): number | undefined {
		if (value === undefined) return undefined

		const parsedValue = Number(value)

		if (isNaN(parsedValue)) {
			badRequest(`value must be a number`, OptionalParseNumberPipe.name)
		}

		return parsedValue
	}
}
