import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SALT } from '../../../config';
import { ClockSys } from '../../clocksys/entity/clocksys.entity';

export enum Role {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('enum', {
    nullable: false,
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(
    type => ClockSys,
    times => times.user,
    { eager: true },
  )
  times: ClockSys[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, SALT);
  }
}
