import { Module } from '@nestjs/common';
import { DeliveryAgent } from './entities/DeliveryAgent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAgentService } from './delivery-agent.service';
import { DeliveryAgentController } from './delivery-agent.controller';

@Module({imports: [TypeOrmModule.forFeature([DeliveryAgent])],
  providers: [DeliveryAgentService],
  controllers: [DeliveryAgentController],})
export class DeliveryAgentModule {
    
}
