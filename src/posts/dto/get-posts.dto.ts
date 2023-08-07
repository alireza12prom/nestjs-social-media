import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPostsDto {
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @Min(5)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
