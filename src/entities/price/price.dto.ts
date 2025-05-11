import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { type RequiredFields } from 'src/utils/types'

export class PriceDto {
	@IsString()
	@ApiProperty({ example: 'abc...' })
	breedId: string

	@IsString()
	@ApiProperty({ example: 'abc...' })
	procedureId: string

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({ example: 30 })
	weight?: number

	@IsNumber()
	@Type(() => Number)
	@ApiProperty({ example: 120 })
	time: number

	@IsNumber()
	@Type(() => Number)
	@ApiProperty({ example: 2500 })
	price: number

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({ example: 7000 })
	maxPrice?: number

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'abc...' })
	description?: string

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: false })
	isDeleted?: boolean
}

export type RequiredPriceDto = RequiredFields<PriceDto, 'weight' | 'time'>
export type PriceDimensions = Pick<
	Required<PriceDto>,
	'breedId' | 'procedureId' | 'weight' | 'time'
>
