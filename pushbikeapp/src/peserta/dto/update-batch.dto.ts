/* eslint-disable prettier/prettier */
// src/peserta/dto/update-batch.dto.ts
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBatchDto {
  @IsInt()
  @IsNotEmpty()
  batch: number;

  @IsArray()
  pesertaIds: number[];
}
