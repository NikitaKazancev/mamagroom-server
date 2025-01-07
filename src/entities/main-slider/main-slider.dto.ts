import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { RequiredFields } from 'src/utils/types'

export class MainSliderDto {
	@IsString()
	@IsOptional()
	imageName?: string

	@IsNumber()
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
