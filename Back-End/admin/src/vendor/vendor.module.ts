import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  exports: [ VendorService],
  providers: [VendorService, EmailService],
  controllers: [VendorController]
})
export class VendorModule {}
