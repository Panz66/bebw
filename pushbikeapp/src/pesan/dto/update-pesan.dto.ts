import { PartialType } from '@nestjs/mapped-types';
import { CreatePesanDto } from './create-pesan.dto';

export class UpdatePesanDto extends PartialType(CreatePesanDto) {}
