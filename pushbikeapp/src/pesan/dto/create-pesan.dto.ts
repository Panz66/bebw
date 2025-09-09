/* eslint-disable prettier/prettier */
// src/pesan/dto/create-pesan.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePesanDto {
  @IsNotEmpty()
  nama: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  pesan: string;
}
