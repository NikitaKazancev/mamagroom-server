import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class MainSliderDto {
	@IsString()
	@IsOptional()
	imageName: string

	@IsNumber()
	@IsOptional()
	order: number

	@IsOptional()
	@IsBoolean()
	isDeleted?: boolean
}
