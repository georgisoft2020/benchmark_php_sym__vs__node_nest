// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'NestJS Benchmark API';
  }

  @Get('benchmark')
  async runBenchmark() {
    return this.appService.benchmark();
  }
}