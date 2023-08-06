import { Provider } from '@nestjs/common';
import { Entity } from '../common/constant';
import { connectionSource } from './connection';
import { Posts, Users } from './entities';
import { DataSource } from 'typeorm';

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
];
