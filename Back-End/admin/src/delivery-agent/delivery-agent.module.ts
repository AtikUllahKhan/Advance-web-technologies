import { Module } from '@nestjs/common';
import { DeliveryAgent } from './entities/DeliveryAgent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAgentService } from './delivery-agent.service';
import { DeliveryAgentController } from './delivery-agent.controller';
import { EmailService } from 'src/email/email.service';

@Module({imports: [TypeOrmModule.forFeature([DeliveryAgent])],
  exports: [ DeliveryAgentService],
  providers: [DeliveryAgentService,EmailService],
  controllers: [DeliveryAgentController],})
export class DeliveryAgentModule {
    
}
