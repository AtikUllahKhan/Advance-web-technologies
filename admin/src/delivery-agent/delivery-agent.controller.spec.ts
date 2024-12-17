import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryAgentController } from './delivery-agent.controller';

describe('DeliveryAgentController', () => {
  let controller: DeliveryAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryAgentController],
    }).compile();

    controller = module.get<DeliveryAgentController>(DeliveryAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
