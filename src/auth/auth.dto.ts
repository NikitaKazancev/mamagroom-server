import { IsEmail, IsOptional, IsString } from 'class-validator'

export class LoginDto {
	@IsEmail()
	email: string

	@IsString()
	password: string
}

export class RegisterDto extends LoginDto {
	@IsString()
	@IsOptional()
	name?: string
}
