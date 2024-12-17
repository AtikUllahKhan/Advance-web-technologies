import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/Admin.entity';
import { Customer } from 'src/customer/entities/Customer.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { DeliveryAgent } from 'src/delivery-agent/entities/DeliveryAgent.entity';


@Module({
    imports: [TypeOrmModule.forRoot(
        {
            type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'trust',
        database: 'QuadraCart',
        entities: [Admin,Customer,Vendor,DeliveryAgent],
        synchronize: true,
        }
    ),
 TypeOrmModule.forFeature([Admin])],
 
    controllers: [ AdminController],
    providers: [ AdminService],
})
export class AdminModule {}
