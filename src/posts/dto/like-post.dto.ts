import { IsUUID } from 'class-validator';

export class LikePostsDto {
  @IsUUID('4')
  postId: string;
}
