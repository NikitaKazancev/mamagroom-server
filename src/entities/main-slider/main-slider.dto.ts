import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import { type RequiredFields } from 'src/utils/types'

export class MainSliderDto {
	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
	@IsPositive()
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({ example: 1 })
	order?: number

	@IsOptional()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}

export type RequiredMainSliderDto = RequiredFields<
	MainSliderDto,
	'order' | 'imageName'
>
