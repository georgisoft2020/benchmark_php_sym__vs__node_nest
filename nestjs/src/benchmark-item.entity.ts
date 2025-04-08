// src/benchmark-item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('benchmark_items')
export class BenchmarkItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}