import { PaginationDto } from '../common/dto';
import { CurrentClient } from '../common/decorator';
import { CommentsService } from './comments.service';
import { AuthorizationGuard } from '../common/gaurd';
import { CreateCommentDto, DeleteCommentDto } from './dto';

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthorizationGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  getComments(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: PaginationDto,
  ) {
    return this.commentsService.getComments({ postId, ...query });
  }

  @Post()
  createComment(@CurrentClient() client, @Body() body: CreateCommentDto) {
    return this.commentsService.createComment(client.id, body);
  }

  @Delete()
  deleteComment(@CurrentClient() client, @Body() body: DeleteCommentDto) {
    return this.commentsService.deleteComment(client.id, body);
  }
}
