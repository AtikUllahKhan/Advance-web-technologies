// File: MultipleFiles/review.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from 'src/customer/entities/Customer.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => Order, (order) => order.reviews)
  order: Order;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  customer: Customer;
}