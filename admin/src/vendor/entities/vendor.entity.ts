import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  vendorname: string;

  @Column('text')
  phonenumber: string;

  @Column({ unique: true, length:100 })
  email: string;

  @Column({ nullable: true })
  location: string;

  @Column({ length: 100 })
  password: string;
}