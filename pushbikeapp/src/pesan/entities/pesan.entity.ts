/* eslint-disable prettier/prettier */
// src/pesan/entities/pesan.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('pesan')
export class Pesan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  email: string;

  @Column('text')
  pesan: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
