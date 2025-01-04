import { Role } from '@prisma/client'
import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsIn,
	IsOptional,
	IsString,
} from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	name: string

	@IsString()
	password: string

	@IsArray()
	@IsIn(Object.values(Role))
	roles: Role[]

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
