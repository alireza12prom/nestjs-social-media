import { Global, Module } from '@nestjs/common';
import { connectionSource } from './connection';

@Global()
@Module({
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        return await connectionSource.initialize();
      },
    },
  ],
})
export class DbModule {}
