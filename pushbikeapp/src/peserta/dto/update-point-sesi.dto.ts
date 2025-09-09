/* eslint-disable prettier/prettier */
import { IsInt, IsOptional } from 'class-validator';

export class UpdatePointSesiDto {
  @IsInt()
  pesertaId: number;

  @IsInt()
  sesi: number;

  @IsOptional()
  @IsInt()
  finish?: number;

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  @IsInt()
  penaltyPoint?: number;
  
}
