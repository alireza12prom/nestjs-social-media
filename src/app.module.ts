import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    JwtModule.register({ global: true }),
    PostsModule,
  ],
})
export class AppModule {}
