/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
// src/peserta/entities/peserta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Lomba } from '../../lomba/entities/lomba.entity';
import { PointSesi } from './point_sesi.entity';

export type Kategori = 'boy' | 'girl';

@Entity({ name: 'peserta' })
export class Peserta {
  @PrimaryGeneratedColumn()
  id_pendaftaran: number;

  @Column({ length: 200 })
  nama: string;

  @Column({ length: 50 })
  plat_number: string;

  @Column({ length: 100 })
  community: string;

  @Column()
  no_hp: string;

  @Column({ type: 'int', default: 0 })
  point1: number;

  @Column({ type: 'int', default: 0 })
  point2: number;

  @Column({ nullable: true, default: 0 })
  penaltyPoint: number;

  @OneToMany(() => PointSesi, (pointSesi) => pointSesi.peserta, { cascade: true })
  pointSesi: PointSesi[];

  @Column({ type: 'int', nullable: true })
  batch: number;

  @Column({ type: 'enum', enum: ['boy', 'girl'] })
  kategori: Kategori;

  @Column({ type: 'enum', enum: ['transfer','midtrans','cod'], default: 'transfer' })
  metode_pembayaran: string;

  @Column({ type: 'boolean', default: false })
  statusPembayaran: boolean;

  @ManyToOne(() => Lomba, (lomba) => lomba.peserta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lomba_id' })
  lomba: Lomba;

  @Column({ type: 'int' })
  lomba_id: number; 


}
