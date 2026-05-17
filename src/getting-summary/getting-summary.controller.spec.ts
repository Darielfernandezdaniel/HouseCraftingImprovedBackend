import { Test, TestingModule } from '@nestjs/testing';
import { GettingSummaryController } from './getting-summary.controller';
import { GettingSummaryService } from './getting-summary.service';

describe('GettingSummaryController', () => {
  let controller: GettingSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GettingSummaryController],
      providers: [GettingSummaryService],
    }).compile();

    controller = module.get<GettingSummaryController>(GettingSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
