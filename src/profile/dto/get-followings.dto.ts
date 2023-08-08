import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../common/dto';

export class GetFollowingsDto extends PaginationDto {
  @IsUUID('4')
  @IsOptional()
  userId: string;
}
