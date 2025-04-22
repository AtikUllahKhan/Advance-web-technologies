import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import { Review } from "src/review/entities/review.entity";
import { Vendor } from "src/vendor/entities/vendor.entity";
import { Column, Entity, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    productname: string;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;

    @Column({default:0})
    stock: number;

    @Column()
    category: string;

    @Column()
    vendorId: number;
    
    @ManyToOne(()=> Vendor, (vendor)=> vendor.products, { onDelete: 'CASCADE'})
    vendor: Vendor;

    @OneToMany(()=> Order, order=> order.product)
     orders: Order[];


    @Column({ type: 'decimal', precision: 2, scale: 1, default: 0})
    averageRating: number;

    @Column('decimal', { precision: 5, scale: 2, nullable: true})
    discount: number;

    @Column({ type: 'timestamp', nullable: true})
    discountStart: Date;

    @Column({ type: 'timestamp', nullable: true})
    discountEnd: Date;

    @OneToMany(() => Cart, (cart) => cart.product)
    carts: Cart[];
}