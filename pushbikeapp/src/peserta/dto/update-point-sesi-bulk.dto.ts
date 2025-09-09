/* eslint-disable prettier/prettier */
// dto/update-point-sesi-bulk.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdatePointSesiDto } from './update-point-sesi.dto';

export class UpdatePointSesiBulkDto {
  @ValidateNested({ each: true })
  @Type(() => UpdatePointSesiDto)
  data: UpdatePointSesiDto[];
}
