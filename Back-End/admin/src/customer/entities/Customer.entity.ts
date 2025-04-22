
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail, Length, IsNotEmpty } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';

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

  @Column({ default: false})
  isVerified: boolean;
  
  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];

  @OneToMany(() => Cart, cart => cart.customer)
  carts: Cart[];
}