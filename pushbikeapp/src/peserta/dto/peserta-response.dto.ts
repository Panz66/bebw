// src/peserta/dto/peserta-response.dto.ts
import { Expose, Transform } from 'class-transformer';

export class PesertaResponseDto {
  @Expose() id_pendaftaran: number;
  @Expose() nama: string;
  @Expose() kategori: string;
  @Expose({ name: 'plat_number' }) platNumber: string;
  @Expose() community: string;
  @Expose() point1: number;
  @Expose() point2: number;
  @Expose() batch: number;

  @Transform(({ obj }) => obj.lomba?.id)
  @Expose() id_lomba: number;
}
