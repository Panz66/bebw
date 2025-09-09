/* eslint-disable prettier/prettier */
// src/pesan/pesan.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesanService } from './pesan.service';
import { PesanController } from './pesan.controller';
import { Pesan } from './entities/pesan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pesan])],
  controllers: [PesanController],
  providers: [PesanService],
})
export class PesanModule {}
