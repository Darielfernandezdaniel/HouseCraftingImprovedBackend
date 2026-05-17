import { Module } from '@nestjs/common';
import { SendContactDataController } from './send-contact-data.controller';
import { SendContactDataService } from './send-contact-data.service';

@Module({
  controllers: [SendContactDataController],
  providers: [SendContactDataService],
})
export class SendContactDataModule {}
