/* eslint-disable prettier/prettier */
// src/peserta/peserta.controller.ts
import { Controller, Post, Body, Param, Get, ParseIntPipe, Patch } from '@nestjs/common';
import { PesertaService } from './peserta.service';
import { CreatePesertaDto } from './dto/create-peserta.dto';
import { UpdateBatchDto } from './dto/update-peserta.dto';
import { UpdatePointSesiBulkDto } from './dto/update-point-sesi-bulk.dto';
import { UpdateStatusPembayaranDto } from './dto/update-status-pembayaran.dto';
import { UpdateMatchNameDto } from './dto/update-match-name.dto';

@Controller('lomba/:id/peserta')
export class PesertaController {
  constructor(private readonly pesertaService: PesertaService) {}

  @Post()
  create(
    @Param('id', ParseIntPipe) lombaId: number,
    @Body() dto: CreatePesertaDto,
  ) {
    return this.pesertaService.create(lombaId, dto);
  }

  @Get()
  findAll(@Param('id', ParseIntPipe) lombaId: number) {
    return this.pesertaService.findAllByLomba(lombaId);
  }

  @Post('batch')
  updateBatch(
    @Param('id', ParseIntPipe) lombaId: number,
    @Body() dto: UpdateBatchDto,
  ) {
    return this.pesertaService.updateBatch(lombaId, dto);
  }

   // ✅ Tambahan endpoint update point sesi
  // src/peserta/peserta.controller.ts
  @Post('hasil-kualifikasi')
  saveHasilKualifikasi(
    @Param('id', ParseIntPipe) lombaId: number,
    @Body() dto: UpdatePointSesiBulkDto, // berisi point1/point2 dan optional penaltyPoint
  ) {
    return this.pesertaService.updatePointSesiBulk(lombaId, dto.data);
  }

  @Post('hasil-sesi')
  saveHasilSesi(
    @Param('id', ParseIntPipe) lombaId: number,
    @Body() dto: UpdatePointSesiBulkDto, // hanya berisi finish + penaltyPoint
  ) {
    return this.pesertaService.updateFinishSesiBulk(lombaId, dto.data);
  }


  @Patch(':pesertaId/status')
  updateStatusPembayaran(
    @Param('id', ParseIntPipe) lombaId: number,
    @Param('pesertaId', ParseIntPipe) pesertaId: number,
    @Body() dto: UpdateStatusPembayaranDto,
  ) {
    return this.pesertaService.updateStatusPembayaran(lombaId, pesertaId, dto);
  }

  @Get('sesi/:sesi')
async getPesertaBySesi(
  @Param('id', ParseIntPipe) lombaId: number,
  @Param('sesi', ParseIntPipe) sesi: number
) {
  return this.pesertaService.findBySesi(lombaId, sesi);
}

@Post(':match/name')
updateMatchName(
  @Param('id', ParseIntPipe) lombaId: number,
  @Body() dto: UpdateMatchNameDto,
) {
  return this.pesertaService.updateMatchName(lombaId, dto);
}

}

