import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';
import { GettingSummary } from '../getting-summary/entities/getting-summary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GettingSummary])],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}