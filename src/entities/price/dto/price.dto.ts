import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class PriceDto {
	@IsOptional()
	@IsString()
	serviceId?: string

	@IsOptional()
	@IsString()
	breedId?: string

	@IsOptional()
	@IsNumber()
	size?: number

	@IsOptional()
	@IsNumber()
	weight?: number

	@IsNumber()
	price: number

	@IsOptional()
	@IsBoolean()
	isUsed?: boolean

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
