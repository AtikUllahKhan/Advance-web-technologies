import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entity/Product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(()=> Order, order=> order.vendor)
  orders: Order[];

  @OneToMany(()=> Product, product=> product.vendor)
  products: Product[];
  
  @Column({ default: false})
  isVerified: boolean;
}