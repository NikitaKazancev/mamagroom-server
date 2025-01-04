import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class PriceDto {
	@IsOptional()
	@IsString()
	breedId: string

	@IsOptional()
	@IsString()
	procedureId: string

	@IsOptional()
	@IsNumber()
	weight: number

	@IsOptional()
	@IsNumber()
	time: number

	@IsNumber()
	price: number

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}

export class PriceDimensionsDto {
	@IsOptional()
	@IsString()
	breedId: string

	@IsOptional()
	@IsString()
	procedureId: string

	@IsOptional()
	@IsNumber()
	weight: number

	@IsOptional()
	@IsNumber()
	time: number
}
