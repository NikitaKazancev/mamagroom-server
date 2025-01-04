import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UserDto {
	@IsString()
	email: string

	@IsString()
	name: string

	@IsString()
	password: string

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
