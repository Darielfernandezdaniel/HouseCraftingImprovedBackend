import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { GettingSummary } from '../getting-summary/entities/getting-summary.entity';


@Injectable()
export class SitemapService {

    constructor(
        @InjectRepository(GettingSummary)
        private readonly summaryRepository: Repository<GettingSummary>){}
        
   private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .trim();
  }

  async generateSitemap(): Promise<string> {
    const articles = await this.summaryRepository.find();

    const links = [
      { url: '/', changefreq: 'monthly', priority: 1.0 },
      { url: '/articles', changefreq: 'weekly', priority: 0.9 },
      ...articles.map(article => ({
        url: `/articles/${article.id}/${this.generateSlug(article.title)}`,
        lastmod: article.date,
        changefreq: 'monthly',
        priority: 0.8,
      })),
    ]
    const stream = new SitemapStream({ hostname: 'https://HouseCrafting.es' });
    const xml = await streamToPromise(Readable.from(links).pipe(stream));
    return xml.toString();
  }
};

