/* eslint-disable prettier/prettier */
import { IsInt, IsString } from 'class-validator';

export class UpdateMatchNameDto {
  @IsInt()
  pesertaId: number;

  @IsInt()
  sesi: number;

  @IsString()
  matchName: string;
}
