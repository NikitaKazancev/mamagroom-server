import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class AuthDto {
	@IsEmail()
	@ApiProperty({ example: 'test@test.ru' })
	email: string

	@IsString()
	@ApiProperty({ example: '123' })
	password: string
}
