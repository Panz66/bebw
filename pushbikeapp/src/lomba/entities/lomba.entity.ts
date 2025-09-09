/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Peserta } from '../../peserta/entities/peserta.entity'

// src/lomba/entities/lomba.entity.ts
export enum Kategori {
  BOY = 'boy',
  GIRL = 'girl',
}


@Entity({ name: 'lomba' })
export class Lomba {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nama: string;

  @Column({ type: 'date' })
  tanggal: string;

  @Column()
  jumlahPeserta: number; // kuota

  @Column({ type: 'int', default: 1 }) // tambahkan jumlah_batch
  jumlahBatch: number;

  @Column()
  biaya: number; // biaya pendaftaran

  @Column({ type: 'enum', enum: ['boy','girl'], default: 'boy' })
  kategori: Kategori;

  @OneToMany(() => Peserta, peserta => peserta.lomba)
  peserta: Peserta[];
}
