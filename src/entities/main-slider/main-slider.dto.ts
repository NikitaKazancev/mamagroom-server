import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'
import { RequiredFields } from 'src/utils/types'

export class MainSliderDto {
	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	order?: number

	@IsBoolean()
	@IsOptional()
	@Type(() => Boolean)
	isDeleted?: boolean
}

export type RequiredMainSliderDto = RequiredFields<
	MainSliderDto,
	'order' | 'imageName'
>
