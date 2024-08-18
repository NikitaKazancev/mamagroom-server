import { Language } from './constants'

export class FilterDto {
	language?: Language
	isUsed?: boolean
	isDeleted?: boolean
	id?: string
}
