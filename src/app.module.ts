import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendContactDataController } from './send-contact-data/send-contact-data.controller';
import { SendContactDataService } from './send-contact-data/send-contact-data.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GettingSummaryModule } from './getting-summary/getting-summary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GettingSummary } from './getting-summary/entities/getting-summary.entity';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [GettingSummary],
        synchronize: config.get('NODE_ENV') !== 'production',

        logging: true,
        retryAttempts: 0,
        retryDelay: 3000,
        autoLoadEntities: true,
        ssl: config.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),
    GettingSummaryModule,
    SitemapModule,
  ],
  controllers: [AppController, SendContactDataController],
  providers: [AppService, SendContactDataService],
})
export class AppModule {}