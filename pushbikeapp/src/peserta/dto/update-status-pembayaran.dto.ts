/* eslint-disable prettier/prettier */
// src/peserta/dto/update-status-pembayaran.dto.ts
import { IsBoolean } from 'class-validator';

export class UpdateStatusPembayaranDto {
  @IsBoolean()
  statusPembayaran: boolean;
}
