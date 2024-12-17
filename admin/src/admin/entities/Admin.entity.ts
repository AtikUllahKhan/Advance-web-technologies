import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:100})
  name: string;

  @Column({ unique: true, length:100 })
  email: string;

  @Column()
  password: string;
}