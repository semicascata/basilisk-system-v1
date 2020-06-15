import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  cep: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contact1: string;

  @Column()
  contact2: string;
}
