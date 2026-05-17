import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GettingSummary } from './entities/getting-summary.entity';
import { GettingSummaryService } from './getting-summary.service';
import { GettingSummaryController } from './getting-summary.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [TypeOrmModule.forFeature([GettingSummary]),
ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 10 },
      { name: 'long', ttl: 60000, limit: 200 },
    ]),
  ],
  providers: [GettingSummaryService],
  controllers: [GettingSummaryController],
})
export class GettingSummaryModule {}