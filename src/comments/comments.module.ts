import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentRepository, PostRepository } from './repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, PostRepository],
})
export class CommentsModule {}
