/* eslint-disable prettier/prettier */
// src/peserta/peserta.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesertaService } from './peserta.service';
import { PesertaController } from './peserta.controller';
import { Peserta } from './entities/peserta.entity';
import { Lomba } from '../lomba/entities/lomba.entity';
import { PointSesi } from './entities/point_sesi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Peserta, Lomba, PointSesi
      
    ]), // <- pastikan ini ada
  ],
  providers: [PesertaService],
  controllers: [PesertaController],
  exports: [PesertaService],
})
export class PesertaModule {}
