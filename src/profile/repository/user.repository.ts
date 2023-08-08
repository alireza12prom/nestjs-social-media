import { Entity } from '../../common/constant';
import { Repository } from 'typeorm';
import { Users } from '../../db/entities';
import { Injectable, Inject } from '@nestjs/common';

interface UpdateOne {
  first_name: string;
  last_name: string;
  email: string;
  userId: string;
}

@Injectable()
export class UserRepository {
  constructor(@Inject(Entity.Users) private user: Repository<Users>) {}

  async getOne(userId: string) {
    return await this.user
      .createQueryBuilder('Profile')
      .where('Profile.id = :userId', { userId: userId })
      .loadRelationCountAndMap('Profile.posts', 'Profile.posts')
      .loadRelationCountAndMap('Profile.followers', 'Profile.followers')
      .loadRelationCountAndMap('Profile.followings', 'Profile.followings')
      .getOne();
  }

  async existsById(userId: string) {
    return await this.user.exist({ where: { id: userId } });
  }

  async existsByEmail(email: string) {
    return await this.user.exist({ where: { email } });
  }

  async update(input: UpdateOne) {
    const update: Record<string, string> = {};

    if (input.first_name) update.first_name = input.first_name;
    if (input.last_name) update.last_name = input.last_name;
    if (input.email) update.email = input.email;

    // if no column exists to update, skip to query
    if (!Object.getOwnPropertyNames(update).length) {
      return null;
    }

    return await this.user
      .createQueryBuilder()
      .update()
      .set(update)
      .where('id = :userId', { userId: input.userId })
      .execute();
  }
}
