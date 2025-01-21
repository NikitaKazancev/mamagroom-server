import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { type RequiredFields } from 'src/utils/types'

export class PriceDto {
	@IsString()
	breedId: string

	@IsString()
	procedureId: string

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	weight?: number

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	time?: number

	@IsNumber()
	@Type(() => Number)
	price: number

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}

export type RequiredPriceDto = RequiredFields<PriceDto, 'weight' | 'time'>
export type PriceDimensions = Pick<
	Required<PriceDto>,
	'breedId' | 'procedureId' | 'weight' | 'time'
>
