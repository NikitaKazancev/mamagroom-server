import { Language } from 'src/utils/constants'

export class ConstantDto {
	language: Language
	type: string
	name: string
	value?: string
}
