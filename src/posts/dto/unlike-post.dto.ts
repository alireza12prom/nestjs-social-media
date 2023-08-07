import { IsUUID } from 'class-validator';

export class UnlikePostsDto {
  @IsUUID('4')
  postId: string;
}
