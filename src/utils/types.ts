export type BooleanMappedType<T> = {
	[K in keyof T]?: boolean
}

export type RequiredFields<Type, Fields extends keyof Type> = Omit<
	Type,
	Fields
> &
	Required<Pick<Type, Fields>>
