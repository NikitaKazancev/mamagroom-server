export class LogDto {
	type: LogType
	key?: string
	message: string
}

export enum LogType {
	info = 'info',
	warning = 'warning',
	error = 'error',
}
