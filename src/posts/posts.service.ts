import path from 'path';
import mimeType from 'mime-types';
import { File } from '../common/constant';
import { GetMediaDto } from './dto/get-meida.dto';
import { FilesystemService } from '../common/service';
import {
  CommentRepository,
  LikeRepository,
  PostRepository,
} from './repository';

import {
  DeletePostDto,
  GetPostDto,
  GetPostsDto,
  LikePostsDto,
  UnlikePostsDto,
  CreatePostDto,
  CreateCommentDto,
  DeleteCommentDto,
  GetCommentDto,
} from './dto';

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    private fileSystemService: FilesystemService,
    private postRepository: PostRepository,
    private likeRepository: LikeRepository,
    private commentRepository: CommentRepository,
  ) {}

  async create(
    userId: string,
    input: CreatePostDto,
    file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('no file attached');
    }

    // move uploaded file in the correct directory
    const attachedFileExt = mimeType.extension(file.mimetype) || undefined;

    if (input.type == 'photo') {
      if (!File.VALID_IMAGE_FORMAT.includes(attachedFileExt)) {
        await this.fileSystemService.remove(file.path); // delete file
        throw new BadRequestException("attached file hasn't a valid format");
      }

      await this.fileSystemService.move(
        file.path,
        path.join(File.PHOTO_PATH, file.filename),
      );
    } else {
      if (!File.VALID_VIDEO_FORMAT.includes(attachedFileExt)) {
        await this.fileSystemService.remove(file.path); // delete file
        throw new BadRequestException("attached file hasn't a valid format");
      }

      await this.fileSystemService.move(
        file.path,
        path.join(File.VIDEO_PATH, file.filename),
      );
    }

    // create new post
    return await this.postRepository.create({
      attached_media: file.filename,
      body: input.body,
      hashtags: input.hashtag,
      type: input.type,
      publisherId: userId,
    });
  }

  async getAllPosts(userId: string, input: GetPostsDto) {
    return await this.postRepository.findUsersPosts({
      publisherId: userId,
      limit: input.limit || 10,
      page: input.page || 1,
    });
  }

  async getOnePost(userId: string, input: GetPostDto) {
    return await this.postRepository.findOnePost({
      publisherId: userId,
      postId: input.id,
    });
  }

  async deletePost(userId: string, input: DeletePostDto) {
    return await this.postRepository.deleteOnePost({
      publisherId: userId,
      postId: input.id,
    });
  }

  async getMedia(input: GetMediaDto) {
    const post = await this.postRepository.findById(input.id);

    if (!post) {
      throw new NotFoundException('no photo or video found');
    }

    let mediaPath: string;
    if (post.type == 'photo') {
      mediaPath = path.join(File.PHOTO_PATH, post.attached_media);
    } else {
      mediaPath = path.join(File.VIDEO_PATH, post.attached_media);
    }

    const buffer = await this.fileSystemService.openReadStream(mediaPath);
    const mime = post.type == 'photo' ? 'image/png' : 'video/mp4';
    const size = await this.fileSystemService.getSize(mediaPath);
    return { buffer, mime, size };
  }

  async like(userId: string, input: LikePostsDto) {
    const isLikedBefore = await this.likeRepository.exists({
      userId,
      postId: input.postId,
    });

    if (isLikedBefore) {
      throw new BadRequestException('you have already liked this post');
    }

    const isPostExists = await this.postRepository.existsById(input.postId);
    if (!isPostExists) {
      throw new NotFoundException("post didn't find");
    }

    await this.likeRepository.create({ userId, postId: input.postId });
  }

  async unlike(userId: string, input: UnlikePostsDto) {
    const result = await this.likeRepository.deleteOne({
      userId,
      postId: input.postId,
    });

    if (!result) {
      throw new BadRequestException('you have not liked this post yet');
    }
  }

  async getComments(input: GetCommentDto) {
    return await this.commentRepository.getAll(input);
  }

  async createComment(userId: string, input: CreateCommentDto) {
    const isPostExists = await this.postRepository.existsById(input.postId);

    if (!isPostExists) {
      throw new NotFoundException("psot didn't find");
    }

    return await this.commentRepository.create({
      userId,
      postId: input.postId,
      body: input.body,
    });
  }

  async deleteComment(userId: string, input: DeleteCommentDto) {
    const result = await this.commentRepository.deleteOne({
      userId,
      postId: input.postId,
      commentId: input.commentId,
    });

    if (!result) {
      throw new NotFoundException("comment didn't find");
    }
  }
}
