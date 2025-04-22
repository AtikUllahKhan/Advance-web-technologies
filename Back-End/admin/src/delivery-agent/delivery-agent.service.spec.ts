import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryAgentService } from './delivery-agent.service';

describe('DeliveryAgentService', () => {
  let service: DeliveryAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryAgentService],
    }).compile();

    service = module.get<DeliveryAgentService>(DeliveryAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
