export const objectFromConstants = (
	data: { name: string; value: string }[]
): Record<string, string> => {
	const res = {}

	data.forEach(({ value, name }) => {
		res[name] = value
	})

	return res
}
