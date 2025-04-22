import { Module } from '@nestjs/common';
import { Customer } from './entities/Customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { EmailService } from 'src/email/email.service';


@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  exports: [ CustomerService],
  providers: [CustomerService,EmailService],
  controllers: [CustomerController]
})
export class CustomerModule {}
