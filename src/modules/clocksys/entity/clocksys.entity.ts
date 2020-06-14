import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entity/user.entity';

export enum Status {
  IN = 'in',
  OUT = 'out',
}

@Entity()
export class ClockSys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  times: Date;

  @Column()
  status: Status;

  @ManyToOne(
    type => User,
    user => user.times,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
