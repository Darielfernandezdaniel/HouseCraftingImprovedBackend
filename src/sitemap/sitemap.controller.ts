import { Controller, Get, Res } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import type { Response } from 'express';

@Controller('sitemap.xml')
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) {}

  @Get()
  async getSitemap(@Res() res:Response){
    const xml = await this.sitemapService.generateSitemap();
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  }
}
