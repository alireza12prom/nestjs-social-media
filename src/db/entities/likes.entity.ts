import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { Posts } from './posts.entity';

@Entity({ name: 'likes' })
export class Likes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  postId: string;

  @Column('uuid')
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  // --- relations

  @ManyToOne(() => Posts, (post) => post.likes, { cascade: true })
  post: Posts;

  @ManyToOne(() => Users, (user) => user.posts, { cascade: true })
  user: Users;
}
