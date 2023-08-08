import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../common/dto';

export class GetFollowersDto extends PaginationDto {
  @IsUUID('4')
  @IsOptional()
  userId: string;
}
