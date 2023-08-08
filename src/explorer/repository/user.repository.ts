import { Injectable, Inject } from '@nestjs/common';
import { Entity } from '../../common/constant';
import { Repository } from 'typeorm';
import { Users } from 'src/db/entities';

interface Find {
  q?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class UserRepository {
  constructor(@Inject(Entity.Users) private user: Repository<Users>) {}

  async find(input: Find) {
    input.limit = input.limit || 10;
    input.page = input.page || 1;

    const search: string[] = [];
    if (input.q) {
      search.push(
        `fullname_vector @@ websearch_to_tsquery('simple', '"${input.q}"')`,
      );
    }

    return await this.user
      .createQueryBuilder()
      .where(search.join(' AND '))
      .skip((input.page - 1) * input.limit)
      .limit(input.limit)
      .getMany();
  }
}
