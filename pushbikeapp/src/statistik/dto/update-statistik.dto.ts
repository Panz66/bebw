import { PartialType } from '@nestjs/mapped-types';
import { CreateStatistikDto } from './create-statistik.dto';

export class UpdateStatistikDto extends PartialType(CreateStatistikDto) {}
