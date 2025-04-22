import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductModule } from 'src/product/product.module';
import { CustomerModule } from 'src/customer/customer.module';
import { Customer } from 'src/customer/entities/Customer.entity';
import { Product } from 'src/product/entity/Product.entity';

@Module({

  imports:[TypeOrmModule.forFeature([Cart,Customer,Product]),CartModule,ProductModule,CustomerModule],
  exports: [ CartService],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
