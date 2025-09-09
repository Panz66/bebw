/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_pendaftaran: number;

  @Column({ unique: true })
  nama: string;

  @Column()
  plat_number: string;

  @Column()
  community: string;

  @Column()
  point1: number;

  @Column()
  point2: number;

  @Column()
  email: string;
}
