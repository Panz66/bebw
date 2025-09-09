/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateLombaDto } from './create-lomba.dto';

export class UpdateLombaDto extends PartialType(CreateLombaDto) {}
