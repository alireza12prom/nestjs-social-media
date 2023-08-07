import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Entity } from '../common/constant';
import { connectionSource } from './connection';
import { Posts, Users, Likes } from './entities';
import { Comments } from '../common/constant/entity';

export const DatabaseProvider: Provider[] = [
  {
    provide: Entity.DATA_SOURCE,
    useFactory: async () => {
      return await connectionSource.initialize();
    },
  },
  {
    provide: Entity.Posts,
    useFactory: (datasource: DataSource) => {
      return datasource.getRepository(Posts);
    },
    inject: [Entity.DATA_SOURCE],
  },
  {
    provide: Entity.Users,
    useFactory: (datasource: DataSource) => {
      return datasource.getRepository(Users);
    },
    inject: [Entity.DATA_SOURCE],
  },
  {
    provide: Entity.Likes,
    useFactory: (datasource: DataSource) => {
      return datasource.getRepository(Likes);
    },
    inject: [Entity.DATA_SOURCE],
  },
  {
    provide: Entity.Comments,
    useFactory: (datasource: DataSource) => {
      return datasource.getRepository(Comments);
    },
    inject: [Entity.DATA_SOURCE],
  },
];
