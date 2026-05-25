import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GettingSummary } from './entities/getting-summary.entity';

@Injectable()
export class GettingSummaryService {
  constructor(
    @InjectRepository(GettingSummary)
    private readonly summaryRepository: Repository<GettingSummary>,
  ) {}

  async findPaginated(page: number): Promise<GettingSummary[]> {
    const itemsPerPage = 5;
    const skip = (page - 1) * itemsPerPage;

    return this.summaryRepository.find({
      skip,
      take: itemsPerPage,
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<GettingSummary> {
    const found = await this.summaryRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    return found;
  }

  async search(query: string, page: number): Promise<GettingSummary[]> {
    const itemsPerPage = 5;
    const skip = (page - 1) * itemsPerPage;

    const searchVector = `to_tsvector('spanish', article.title || ' ' || COALESCE(article.description, ''))`;
    const searchQuery = `plainto_tsquery('spanish', :query)`;

    return this.summaryRepository
      .createQueryBuilder('article')
      .where(`${searchVector} @@ ${searchQuery}`, { query })
      .orderBy(`ts_rank(${searchVector}, ${searchQuery})`, 'DESC')
      .skip(skip)
      .take(itemsPerPage)
      .getMany();
  }

  async findBySlug(slug: string): Promise<GettingSummary> {
    const articles = await this.summaryRepository.find();
    const found = articles.find(a => this.generateSlug(a.title) === slug);
    if (!found) throw new NotFoundException(`Artículo con slug ${slug} no encontrado`);
  return found;
}

  async findByService(service: string): Promise<GettingSummary[]> {
    return this.summaryRepository.find({
      where: { service },
      order: { id: 'DESC' },
      take: 10,
    });
  }

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
}