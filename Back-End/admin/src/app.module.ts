import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { DeliveryAgentModule } from './delivery-agent/delivery-agent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './email/email.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ReviewService } from './review/review.service';
import { ReviewController } from './review/review.controller';
import { ReviewModule } from './review/review.module';
import { CartModule } from './cart/cart.module';



@Module({
  imports: [AdminModule, CustomerModule, VendorModule,DeliveryAgentModule, EmailModule, ProductModule, OrderModule, ReviewModule, CartModule ],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}

