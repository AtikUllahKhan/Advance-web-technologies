// File: MultipleFiles/cart.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from 'src/customer/entities/Customer.entity';
import { Product } from 'src/product/entity/Product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Customer, (customer) => customer.carts)
  customer: Customer;
  @Column()
  customerId: number;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;
  @Column()
  productId: number;
}