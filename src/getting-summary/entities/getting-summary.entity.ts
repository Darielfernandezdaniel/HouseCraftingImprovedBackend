import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('post_summaries')
@Unique(['title'])
export class GettingSummary {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  service!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  image_url!: string;

  @Column({ type: 'text', nullable: true })
  article!: string;
}