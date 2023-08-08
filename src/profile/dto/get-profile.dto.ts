import { IsOptional, IsUUID } from 'class-validator';

export class GetProfileDto {
  @IsUUID('4')
  @IsOptional()
  userId: string;
}
