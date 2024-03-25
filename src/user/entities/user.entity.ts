import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, comment: '用户名' })
  username: string;

  @Column({ length: 50, comment: '密码' })
  password: string;

  @Column({ name: 'nick_name', length: 50, comment: '昵称' })
  nickName: string;

  @Column({ length: 50, comment: '邮箱' })
  email: string;

  @Column({ length: 100, comment: '头像', nullable: true })
  headPic: string;

  @Column({ length: 20, comment: '手机号', nullable: true })
  phoneNumber: string;

  @Column({ default: false, comment: '是否冻结' })
  isFrozen: boolean;

  @Column({ comment: '是否是管理员', default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
