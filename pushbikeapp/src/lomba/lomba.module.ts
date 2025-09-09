/* eslint-disable prettier/prettier */
// src/lomba/lomba.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lomba } from './entities/lomba.entity';
import { LombaService } from './lomba.service';
import { LombaController } from './lomba.controller';
import { Peserta } from '../peserta/entities/peserta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lomba, Peserta])],
  controllers: [LombaController],
  providers: [LombaService],
  exports: [LombaService],
})
export class LombaModule {}
