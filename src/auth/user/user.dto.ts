import { Role } from '@prisma/client'
import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsOptional,
	IsString,
} from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	password: string

	@IsString()
	@IsOptional()
	name?: string

	@IsArray()
	@IsOptional()
	roles?: Role[]

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
