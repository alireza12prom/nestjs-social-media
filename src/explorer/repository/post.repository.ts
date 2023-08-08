import { Inject, Injectable } from '@nestjs/common';
import { Entity } from '../../common/constant';
import { Repository } from 'typeorm';
import { Posts } from 'src/db/entities';

interface Find {
  q?: string;
  type?: string;
  hashtags: string[];
  page?: number;
  limit?: number;
}

@Injectable()
export class PostRepository {
  constructor(@Inject(Entity.Posts) private post: Repository<Posts>) {}

  async find(input: Find) {
    input.limit = input.limit || 10;
    input.page = input.page || 1;

    const search: string[] = [];

    if (input.q) {
      search.push(
        `body_vector @@ websearch_to_tsquery('simple', '"${input.q}"')`,
      );
    }
    if (input.type) {
      search.push(`type = '${input.type}'`);
    }
    if (input.hashtags.length) {
      search.push(`hashtags && '{${input.hashtags}}'`);
    }

    return await this.post
      .createQueryBuilder('Post')
      .where(search.join(' AND '))
      .skip((input.page - 1) * input.limit)
      .limit(input.limit)
      .leftJoin('Post.publisher', 'Publisher')
      .addSelect('Publisher.id')
      .addSelect('Publisher.first_name')
      .addSelect('Publisher.last_name')
      .getMany();
  }
}
