import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  body: string;

  @IsUUID('4')
  postId: string;
}
