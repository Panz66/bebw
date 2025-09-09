/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDateString, IsInt, Min, IsEnum } from 'class-validator';
import * as lombaEntity from '../entities/lomba.entity';

export class CreateLombaDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsDateString()
  tanggal: string;

  @IsInt()
  @Min(1)
  jumlahPeserta: number;

  @IsInt()
  @Min(1)
  jumlahBatch: number; 

  @IsInt()
  @Min(0)
  biaya: number;

  @IsEnum(['boy','girl'])
  kategori: lombaEntity.Kategori;
}
