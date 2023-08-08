import { IsIn, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../common/dto';

export class FindPostDto extends PaginationDto {
  @IsString()
  @IsOptional()
  q: string = undefined;

  @IsIn(['photo', 'video'])
  @IsOptional()
  type: 'photo' | 'video';

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => value.split(',').filter((s) => s != ''))
  hashtags: string[] = [];
}
