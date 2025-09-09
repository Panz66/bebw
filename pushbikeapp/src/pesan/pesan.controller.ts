/* eslint-disable prettier/prettier */
// src/pesan/pesan.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PesanService } from './pesan.service';
import { CreatePesanDto } from './dto/create-pesan.dto';

@Controller('pesan')
export class PesanController {
  constructor(private readonly pesanService: PesanService) {}

  @Post()
  create(@Body() createPesanDto: CreatePesanDto) {
    return this.pesanService.create(createPesanDto);
  }

  @Get()
  findAll() {
    return this.pesanService.findAll();
  }
}
