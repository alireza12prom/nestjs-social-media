import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Posts, Connections } from '.';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  // --- relation

  @OneToMany(() => Posts, (post) => post.publisher)
  posts: Posts[];

  @OneToMany(() => Connections, (connection) => connection.user)
  followings: Connections[];

  @OneToMany(() => Connections, (connection) => connection.target)
  followers: Connections[];
}
