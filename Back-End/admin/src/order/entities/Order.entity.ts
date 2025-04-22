// File: MultipleFiles/order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from 'src/customer/entities/Customer.entity';
import { Product } from 'src/product/entity/Product.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { DeliveryAgent } from 'src/delivery-agent/entities/DeliveryAgent.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column({ default: "Pending"})
  status: string; // e.g., 'Pending', 'Completed', 'Cancelled'

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @Column()
  customerId: number;


  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;
  @Column()
  productId: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Vendor;
  @Column()
  vendorId: number;

  @ManyToOne(() => DeliveryAgent, (deliveryAgent) => deliveryAgent.orders, { nullable: true })
  deliveryAgent: DeliveryAgent;
  
   @OneToMany(() => Review, review => review.order)
  reviews: Review[];

}