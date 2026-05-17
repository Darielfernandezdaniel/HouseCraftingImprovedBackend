import { Test, TestingModule } from '@nestjs/testing';
import { SendContactDataService } from './send-contact-data.service';

describe('SendContactDataService', () => {
  let service: SendContactDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendContactDataService],
    }).compile();

    service = module.get<SendContactDataService>(SendContactDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
