import { IsUUID } from 'class-validator';

export class DeleteCommentDto {
  @IsUUID('4')
  postId: string;

  @IsUUID('4')
  commentId: string;
}
