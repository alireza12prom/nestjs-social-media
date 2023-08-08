import { IsUUID } from 'class-validator';

export class UnfollowProfileDto {
  @IsUUID('4')
  targetId: string;
}
