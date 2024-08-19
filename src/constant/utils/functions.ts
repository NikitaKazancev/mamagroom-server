import { toCamelCase } from 'src/utils/functions'

export const objectFromConstants = (
	data: { name: string; value: string }[]
): Record<string, string> => {
	const res = {}

	data.forEach(({ value, name }) => {
		res[toCamelCase(name)] = value
	})

	return res
}
