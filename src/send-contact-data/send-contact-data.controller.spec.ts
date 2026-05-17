import { Test, TestingModule } from '@nestjs/testing';
import { SendContactDataController } from './send-contact-data.controller';

describe('SendContactDataController', () => {
  let controller: SendContactDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendContactDataController],
    }).compile();

    controller = module.get<SendContactDataController>(SendContactDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
