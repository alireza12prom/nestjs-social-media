import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Users, Likes, Comments } from '.';

// ----- post types
enum PostTypes {
  IMAGE = 'photo',
  VIDEO = 'video',
}

@Entity({ name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  publisherId: string;

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

  @Index('GIN_fulltext_post_body', { synchronize: false })
  @Column({
    type: 'tsvector',
    generatedType: 'STORED',
    select: false,
    asExpression: "to_tsvector('simple', body)",
  })
  body_vector: string;

  // --- relation

  @ManyToOne(() => Users, (user) => user.posts, { cascade: true })
  publisher: Users;

  @OneToMany(() => Likes, (like) => like.post)
  likes: Likes[];

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];
}
