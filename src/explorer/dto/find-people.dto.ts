import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto';

export class FindPeopleDto extends PaginationDto {
  @IsString()
  @IsOptional()
  q: string;
}
