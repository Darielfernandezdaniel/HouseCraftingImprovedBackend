import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { GettingSummaryService } from './getting-summary.service';
import { Throttle } from '@nestjs/throttler';

@Throttle({ 
  short: { limit: 10, ttl: 1000 },
  long: { limit: 200, ttl: 60000 },
})
@Controller('summaries')
export class GettingSummaryController {
  constructor(private readonly summaryService: GettingSummaryService) {}

  @Get('search')
  async search(
    @Query('q') query: string, 
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1
  ) {
    if (!query || query.trim() === '') return [];
    return this.summaryService.search(query, page);
  }

  @Get()
  findPaginated(@Query('page', new ParseIntPipe({ optional: true })) page: number = 1) {
    return this.summaryService.findPaginated(page);
  }

  @Get(':idOrSlug')
    findOne(@Param('idOrSlug') idOrSlug: string) {
    const id = parseInt(idOrSlug);
    return isNaN(id) 
      ? this.summaryService.findBySlug(idOrSlug)
      : this.summaryService.findOne(id);
  }

  @Get('by-service/:service')
    findByService(@Param('service') service: string) {
      return this.summaryService.findByService(service);
    }
}