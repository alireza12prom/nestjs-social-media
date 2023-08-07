import { Repository } from 'typeorm';
import { Comments } from 'src/db/entities';
import { Entity } from '../../common/constant';
import { Injectable, Inject } from '@nestjs/common';

interface CreateOn {
  userId: string;
  postId: string;
  body: string;
}

interface DeleteOne {
  postId: string;
  userId: string;
  commentId: string;
}

interface GetAll {
  postId: string;
  page: number;
  limit: number;
}

@Injectable()
export class CommentRepository {
  constructor(@Inject(Entity.Comments) private comment: Repository<Comments>) {}

  async create(input: CreateOn) {
    const comment = this.comment.create(input);
    return await this.comment.save(comment);
  }

  async deleteOne(input: DeleteOne) {
    const { affected } = await this.comment.delete({
      id: input.postId,
      postId: input.postId,
      userId: input.userId,
    });
    return affected ? true : false;
  }

  async getAll(input: GetAll) {
    input.page = input.page || 1;
    input.limit = input.limit || 10;

    return await this.comment.find({
      where: { postId: input.postId },
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      order: { createdAt: 'DESC' },
      relations: { user: true },
      select: {
        user: { id: true, first_name: true, last_name: true },
      },
    });
  }
}
