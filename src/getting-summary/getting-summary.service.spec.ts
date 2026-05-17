import { Test, TestingModule } from '@nestjs/testing';
import { GettingSummaryService } from './getting-summary.service';

describe('GettingSummaryService', () => {
  let service: GettingSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GettingSummaryService],
    }).compile();

    service = module.get<GettingSummaryService>(GettingSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
