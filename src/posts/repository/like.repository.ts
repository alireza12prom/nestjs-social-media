import { Injectable, Inject } from '@nestjs/common';
import { Likes } from 'src/db/entities';
import { Entity } from '../../common/constant';
import { Repository } from 'typeorm';

interface CreateOn {
  userId: string;
  postId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteOne extends CreateOn {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Exists extends CreateOn {}

@Injectable()
export class LikeRepository {
  constructor(@Inject(Entity.Likes) private like: Repository<Likes>) {}

  async create(input: CreateOn) {
    const like = await this.like.create(input);
    return await this.like.save(like);
  }

  async exists(input: Exists) {
    return await this.like.exist({
      where: { postId: input.postId, userId: input.userId },
    });
  }

  async deleteOne(input: DeleteOne) {
    const { affected } = await this.like.delete({
      postId: input.postId,
      userId: input.userId,
    });
    return affected ? true : false;
  }
}
