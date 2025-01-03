type BooleanMappedType<T> = {
	[K in keyof T]?: boolean
}
