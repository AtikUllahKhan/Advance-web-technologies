import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product,Vendor])],
        controllers: [ ProductController],
        exports: [ ProductService],
        providers: [ ProductService]
})
export class ProductModule {}
