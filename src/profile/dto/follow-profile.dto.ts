import { IsUUID } from 'class-validator';

export class FollowProfileDto {
  @IsUUID('4')
  targetId: string;
}
