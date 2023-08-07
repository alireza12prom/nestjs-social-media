import { Repository } from 'typeorm';
import { Posts } from 'src/db/entities';
import { Entity } from '../../common/constant';
import { Injectable, Inject } from '@nestjs/common';
import { BasePostRepository } from '../../common/repository';

@Injectable()
export class PostRepository extends BasePostRepository {
  constructor(@Inject(Entity.Posts) protected post: Repository<Posts>) {
    super(post);
  }
}
