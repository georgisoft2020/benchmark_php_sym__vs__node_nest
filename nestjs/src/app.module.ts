// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenchmarkItem } from './benchmark-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql-nestjs',
      port: parseInt((process.env.DB_PORT || 3306).toString()),
      username: process.env.DB_USERNAME || 'benchmark',
      password: process.env.DB_PASSWORD || 'benchmark123',
      database: process.env.DB_DATABASE || 'benchmark',
      entities: [BenchmarkItem],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([BenchmarkItem]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}