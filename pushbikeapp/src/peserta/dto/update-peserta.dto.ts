/* eslint-disable prettier/prettier */
// src/peserta/dto/update-peserta.dto.ts
import { IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateBatchDto {
  @IsInt()
  batch: number;

  @IsArray()
  @ArrayNotEmpty()
  pesertaIds: number[];
}
