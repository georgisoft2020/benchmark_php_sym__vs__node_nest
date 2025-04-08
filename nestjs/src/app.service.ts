// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BenchmarkItem } from './benchmark-item.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BenchmarkItem)
    private benchmarkItemRepository: Repository<BenchmarkItem>,
  ) {}

  // Read operations
  async findAll(): Promise<BenchmarkItem[]> {
    return this.benchmarkItemRepository.find();
  }

  async findOne(id: number): Promise<BenchmarkItem|null> {
    return this.benchmarkItemRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<BenchmarkItem[]> {
    return this.benchmarkItemRepository.find({ where: { name } });
  }

  // Write operations
  async create(item: Partial<BenchmarkItem>): Promise<BenchmarkItem> {
    const newItem = this.benchmarkItemRepository.create(item);
    return this.benchmarkItemRepository.save(newItem);
  }

  async update(id: number, item: Partial<BenchmarkItem>): Promise<void> {
    await this.benchmarkItemRepository.update(id, item);
  }

  async delete(id: number): Promise<void> {
    await this.benchmarkItemRepository.delete(id);
  }

  // For benchmarking - 10 reads and 10 writes
  async benchmark(): Promise<{ duration: number }> {
    const startTime = process.hrtime();

    // 10 reads
    await this.findAll();
    await this.findOne(1);
    await this.findByName('item1');
    await this.findAll();
    await this.findOne(2);
    await this.findByName('item2');
    await this.findAll();
    await this.findOne(3);
    await this.findByName('item3');
    await this.findOne(4);

    // 10 writes
    const randomStr = Math.random().toString(36).substring(7);
    await this.create({ name: `benchmark-${randomStr}-1`, value: 'Test value 1' });
    await this.create({ name: `benchmark-${randomStr}-2`, value: 'Test value 2' });
    await this.create({ name: `benchmark-${randomStr}-3`, value: 'Test value 3' });
    await this.create({ name: `benchmark-${randomStr}-4`, value: 'Test value 4' });
    await this.create({ name: `benchmark-${randomStr}-5`, value: 'Test value 5' });
    await this.update(1, { value: `Updated at ${new Date().toISOString()}` });
    await this.update(2, { value: `Updated at ${new Date().toISOString()}` });
    await this.update(3, { value: `Updated at ${new Date().toISOString()}` });
    await this.update(4, { value: `Updated at ${new Date().toISOString()}` });
    await this.update(5, { value: `Updated at ${new Date().toISOString()}` });

    const diff = process.hrtime(startTime);
    const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds

    return { duration };
  }
}