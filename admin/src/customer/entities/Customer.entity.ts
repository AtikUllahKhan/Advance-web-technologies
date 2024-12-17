import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { IsEmail, Length, IsNotEmpty } from 'class-validator';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')

  phonenumber: string;

  @Column({ unique: true, length:100 })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ length: 100 })
  password: string;
}