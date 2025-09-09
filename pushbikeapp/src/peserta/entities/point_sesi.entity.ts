/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Peserta } from './peserta.entity'; // ✅ tambahkan import ini

@Entity('point_sesi')
export class PointSesi {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Peserta, peserta => peserta.pointSesi)
  peserta: Peserta;

  @Column()
  sesi: number; // sesi 1, 2, dst sesuai match

  @Column({ type: 'int', nullable: true })
  finish?: number; // input admin

  @Column({ type: 'int', default: 0 })
  point?: number; // bisa dihitung dari finish

  @Column({ name: 'penalty_point', type: 'int', default: 0 })
  penaltyPoint: number;

  @Column({ name: 'match_name', type: 'varchar', length: 100, nullable: true })
  matchName?: string; // ✅ tambahan untuk nama match

}
