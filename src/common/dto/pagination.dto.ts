import { Transform } from 'class-transformer';
import { Min, IsOptional } from 'class-validator';

export class PaginationDto {
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @Min(5)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
