import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { IsEmail, Length, IsNotEmpty } from 'class-validator';

@Entity()
export class DeliveryAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  deliveryAgentname: string;

  @Column('text')
  phonenumber: string;

  @Column({ unique: true, length:100 })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ length: 500 })
  vehicleType: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: false})
  isVerified: boolean;

  @OneToMany(() => Order, order => order.deliveryAgent)
  orders: Order[];
}