import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { DeliveryAgentModule } from './delivery-agent/delivery-agent.module';


@Module({
  imports: [AdminModule, CustomerModule, VendorModule,DeliveryAgentModule ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
