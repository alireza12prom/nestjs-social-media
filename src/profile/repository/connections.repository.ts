import { Repository } from 'typeorm';
import { Entity } from '../../common/constant';
import { Connections } from '../../db/entities';
import { Injectable, Inject } from '@nestjs/common';

interface CreateOne {
  userId: string;
  targetId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteOne extends CreateOne {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Exists extends CreateOne {}

interface GetFollowers {
  userId: string;
  limit: number;
  page: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GetFollowings extends GetFollowers {}

@Injectable()
export class ConnectionRepository {
  constructor(
    @Inject(Entity.Connections) private connection: Repository<Connections>,
  ) {}

  async create(input: CreateOne) {
    const connection = this.connection.create({
      userId: input.userId,
      targetId: input.targetId,
    });
    return await this.connection.save(connection);
  }

  async delete(input: DeleteOne) {
    return await this.connection.delete({
      userId: input.userId,
      targetId: input.targetId,
    });
  }

  async exists(input: Exists) {
    return await this.connection.exist({
      where: { userId: input.userId, targetId: input.targetId },
    });
  }

  async followers(input: GetFollowers) {
    input.limit = input.limit || 10;
    input.page = input.page || 1;

    return await this.connection
      .createQueryBuilder('Connection')
      .select('Connection.id')
      .addSelect('Connection.createdAt')
      .where('Connection.targetId = :targetId', { targetId: input.userId })
      .leftJoin('Connection.user', 'User', 'User.id = Connection.userId')
      .addSelect('User.id')
      .addSelect('User.first_name')
      .addSelect('User.last_name')
      .skip((input.page - 1) * input.limit)
      .limit(input.limit)
      .getMany();
  }

  async followings(input: GetFollowings) {
    input.limit = input.limit || 10;
    input.page = input.page || 1;
    console.log(input);

    return await this.connection
      .createQueryBuilder('Connection')
      .select('Connection.id')
      .addSelect('Connection.createdAt')
      .where('Connection.userId = :userId', { userId: input.userId })
      .leftJoin(
        'Connection.target',
        'Target',
        'Target.id = Connection.targetId',
      )
      .addSelect('Target.id')
      .addSelect('Target.first_name')
      .addSelect('Target.last_name')
      .skip((input.page - 1) * input.limit)
      .limit(input.limit)
      .getMany();
  }
}
