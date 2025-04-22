import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { Product } from 'src/product/entity/Product.entity';
import { Order } from 'src/order/entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
    imports: [TypeOrmModule.forFeature([Review, Product, Order]), ProductModule, OrderModule,CustomerModule], 
      exports: [ ReviewService],
      providers: [ReviewService],
      controllers: [ReviewController]
})
export class ReviewModule {}
