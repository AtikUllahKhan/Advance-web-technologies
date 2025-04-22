import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/Product.entity';
import { Order } from './entities/order.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { ProductModule } from 'src/product/product.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { DeliveryAgent } from 'src/delivery-agent/entities/DeliveryAgent.entity';
import { DeliveryAgentModule } from 'src/delivery-agent/delivery-agent.module';
import { Customer } from 'src/customer/entities/Customer.entity';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Vendor, Product,DeliveryAgent,Customer]), ProductModule, VendorModule,DeliveryAgentModule,CustomerModule], 
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
