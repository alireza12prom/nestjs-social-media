import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';

@Entity({ name: 'connections' })
export class Connections {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  targetId: string;

  @CreateDateColumn()
  createdAt: Date;

  // --- relations

  @ManyToOne(() => Users, (user) => user.followers, { cascade: true })
  user: Users;

  @ManyToOne(() => Users, (user) => user.followings, { cascade: true })
  target: Users;
}
