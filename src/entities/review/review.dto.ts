import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator'

export class ReviewDto {
	@IsString()
	@ApiProperty({ example: 'Марина К.' })
	name: string

	@IsNumber()
	@IsPositive()
	@ApiProperty({ example: 5 })
	@Type(() => Number)
	rating: number

	@IsDate()
	@Type(() => Date)
	date: Date

	@IsString()
	@ApiProperty({ example: 'Отличный салон, приятная атмосфера.' })
	description: string
}
