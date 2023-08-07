import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Posts } from 'src/db/entities';

@Injectable()
export class BasePostRepository {
  constructor(protected post: Repository<Posts>) {}

  async exists(postId: string) {
    return await this.post.exist({ where: { id: postId } });
  }

  async findById(postId: string) {
    return await this.post.findOneBy({ id: postId });
  }
}
