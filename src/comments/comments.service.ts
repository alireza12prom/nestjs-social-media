import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository, PostRepository } from './repository';
import { CreateCommentDto, DeleteCommentDto, GetCommentDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
  ) {}

  async getComments(input: GetCommentDto) {
    return await this.commentRepository.getAll(input);
  }

  async createComment(userId: string, input: CreateCommentDto) {
    const isPostExists = await this.postRepository.exists(input.postId);

    if (!isPostExists) {
      throw new NotFoundException("psot didn't find");
    }

    return await this.commentRepository.create({
      userId,
      postId: input.postId,
      body: input.body,
    });
  }

  async deleteComment(userId: string, input: DeleteCommentDto) {
    const result = await this.commentRepository.deleteOne({
      userId,
      postId: input.postId,
      commentId: input.commentId,
    });

    if (!result) {
      throw new NotFoundException("comment didn't find");
    }
  }
}
