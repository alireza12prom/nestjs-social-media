import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../../db/entities';
import { Entity } from '../../common/constant';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(@Inject(Entity.Users) private userModel: Repository<Users>) {}

  async createIfNotExists(email: string) {
    let userId: string;

    try {
      userId = (await this.userModel.findOneByOrFail({ email: email })).id;
    } catch (error) {
      const user = this.userModel.create({ email: email });
      userId = (await this.userModel.save(user)).id;
    }
    return userId;
  }
}
