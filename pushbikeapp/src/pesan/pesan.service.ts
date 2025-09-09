/* eslint-disable prettier/prettier */
// src/pesan/pesan.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesan } from './entities/pesan.entity';
import { CreatePesanDto } from './dto/create-pesan.dto';

@Injectable()
export class PesanService {
  constructor(
    @InjectRepository(Pesan)
    private pesanRepository: Repository<Pesan>,
  ) {}

  create(createPesanDto: CreatePesanDto) {
    const pesan = this.pesanRepository.create(createPesanDto);
    return this.pesanRepository.save(pesan);
  }

  findAll() {
    return this.pesanRepository.find({
      order: { created_at: 'DESC' },
    });
  }
}
