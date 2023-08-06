import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';

// ----- post types
enum PostTypes {
  IMAGE = 'photo',
  VIDEO = 'video',
}

@Entity({ name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.posts, { cascade: true })
  publisher: Users;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar' })
  attached_media: string;

  @Column({ type: 'enum', enum: PostTypes })
  type: string;

  @Column({ type: 'varchar', array: true, default: [] })
  hashtags: string[];

  @CreateDateColumn()
  createdAt: Date;
}
