import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import { RequiredFields } from 'src/utils/types'

export class MainSliderDto {
	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
	@IsPositive()
	@IsOptional()
	@Type(() => Number)
	order?: number

	@IsOptional()
	isDeleted?: boolean
}

export type RequiredMainSliderDto = RequiredFields<
	MainSliderDto,
	'order' | 'imageName'
>
