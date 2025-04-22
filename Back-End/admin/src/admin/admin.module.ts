import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/Admin.entity';
import { Customer } from 'src/customer/entities/Customer.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { DeliveryAgent } from 'src/delivery-agent/entities/DeliveryAgent.entity';
import { EmailService } from 'src/email/email.service';
import { Product } from 'src/product/entity/Product.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';
//import { EmailService } from 'src/email/email.service';
//import { Product } from 'src/product/entities/product.entity';
//import { Order } from 'src/order/entities/order.entity';
//import { Cart } from 'src/cart/entities/cart.entity';
//import { OrderItem } from 'src/order/entities/order-item.entity';
//import { CartItem } from 'src/cart/entities/cart-item.entity';



@Module({
    imports: [TypeOrmModule.forRoot(
        {
            type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'trust',
        database: 'QuadraCart',
        entities: [Admin,Customer,Vendor,DeliveryAgent,Product,Order,Review,Cart],
        synchronize: true,
        }
    ),
    TypeOrmModule.forFeature([Admin])],
    exports: [ AdminService],
    controllers: [ AdminController],
    providers: [ AdminService,EmailService],
})
export class AdminModule {} 