import { Injectable, Inject } from '@nestjs/common';
import { Posts } from 'src/db/entities';
import { Entity } from '../../common/constant';
import { Repository } from 'typeorm';

interface CratePost {
  body: string;
  hashtags: string[];
  type: string;
  publisherId: string;
  attached_media: string;
}

interface AllPosts {
  page: number;
  limit: number;
  publisherId: string;
}

interface OnePost {
  postId: string;
  publisherId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteOne extends OnePost {}

@Injectable()
export class PostRepository {
  constructor(@Inject(Entity.Posts) private post: Repository<Posts>) {}

  async create(input: CratePost) {
    const post = this.post.create({
      body: input.body,
      attached_media: input.attached_media,
      type: input.type,
      hashtags: input.hashtags,
      publisherId: input.publisherId,
    });
    return await this.post.save(post);
  }

  async findById(postId: string) {
    return await this.post.findOneBy({ id: postId });
  }

  async findUsersPosts(input: AllPosts) {
    return await this.post.find({
      where: { publisherId: input.publisherId },
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      order: { createdAt: { direction: 'DESC' } },
      select: { id: true, attached_media: true, createdAt: true },
    });
  }

  async findOnePost(input: OnePost) {
    return await this.post
      .createQueryBuilder('post')
      .where('post.id = :postId AND post.publisherId = :publisherId', {
        postId: input.postId,
        publisherId: input.publisherId,
      })
      .loadRelationCountAndMap('post.likes', 'post.likes')
      .loadRelationCountAndMap('post.comments', 'post.comments')
      .getOne();
  }

  async deleteOnePost(input: DeleteOne) {
    await this.post.delete({
      id: input.postId,
      publisherId: input.publisherId,
    });
  }

  async existsById(postId: string) {
    return await this.post.exist({ where: { id: postId } });
  }
}
