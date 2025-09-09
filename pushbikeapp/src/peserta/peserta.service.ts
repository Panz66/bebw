/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In} from 'typeorm';
import { Peserta } from './entities/peserta.entity';
import { CreatePesertaDto } from './dto/create-peserta.dto';
import { Lomba } from '../lomba/entities/lomba.entity';
import { UpdateBatchDto } from './dto/update-peserta.dto';
import { PointSesi } from './entities/point_sesi.entity';
import { UpdatePointSesiDto } from './dto/update-point-sesi.dto';
import { UpdateStatusPembayaranDto } from './dto/update-status-pembayaran.dto';
import { UpdateMatchNameDto } from './dto/update-match-name.dto';

@Injectable()
export class PesertaService {
  constructor(
    @InjectRepository(Peserta)
    private pesertaRepo: Repository<Peserta>,
    @InjectRepository(Lomba)
    private lombaRepo: Repository<Lomba>,
    @InjectRepository(PointSesi)
    private pointSesiRepo: Repository<PointSesi>,
  ) {}

  async create(lombaId: number, dto: CreatePesertaDto) {
    const lomba = await this.lombaRepo.findOne({
      where: { id: lombaId },
      relations: ['peserta'],
    });

    if (!lomba) throw new BadRequestException('Lomba tidak ditemukan');

    // ✅ cek kuota
    const pesertaCount = lomba.peserta.length;
    if (pesertaCount >= lomba.jumlahPeserta) {
      throw new BadRequestException('Kuota lomba sudah penuh');
    }

    const peserta = this.pesertaRepo.create({
      ...dto,
      lomba,
    });

    return this.pesertaRepo.save(peserta);
  }

  /* src/peserta/peserta.service.ts */
async findAllByLomba(lombaId: number) {
  const peserta = await this.pesertaRepo
    .createQueryBuilder('peserta')
    .leftJoinAndSelect('peserta.lomba', 'lomba')
    .leftJoinAndSelect('peserta.pointSesi', 'pointSesi')
    .where('peserta.lomba_id = :id', { id: lombaId })
    .getMany();

  // debug server-side: cek apakah pointSesi berisi penaltyPoint
  console.log('DEBUG peserta (with pointSesi):', JSON.stringify(peserta.slice(0,5), null, 2));

  return peserta.map((p) => ({
    id_pendaftaran: p.id_pendaftaran,
    nama: p.nama,
    kategori: p.kategori,
    platNumber: p.plat_number,
    community: p.community,
    id_lomba: p.lomba?.id,
    point1: p.point1,
    point2: p.point2,
    batch: p.batch,
    statusPembayaran: p.statusPembayaran,
    // kembalikan array pointSesi dengan kedua nama field penalty (snake + camel)
    pointSesi: (p.pointSesi ?? []).map((ps) => ({
      id: ps.id,
      sesi: ps.sesi,
      finish: ps.finish,
      point: ps.point,
      // sertakan kedua key supaya frontend bisa mengakses dengan mudah
      penaltyPoint: ps.penaltyPoint,
      penalty_point: ps.penaltyPoint,
      pesertaIdPendaftaran: p.id_pendaftaran,
      matchName: ps.matchName, 
    })),
  }));
}


async updateBatch(lombaId: number, dto: UpdateBatchDto) {
  const { batch, pesertaIds } = dto;

  if (!pesertaIds || pesertaIds.length === 0) {
    throw new BadRequestException('Tidak ada peserta yang dikirim');
  }

  const lomba = await this.lombaRepo.findOne({ where: { id: lombaId } });
  if (!lomba) throw new BadRequestException('Lomba tidak ditemukan');

  const result = await this.pesertaRepo.update(
    { id_pendaftaran: In(pesertaIds), lomba: { id: lombaId } },
    { batch },
  );

  return {
    message: 'Batch berhasil disimpan',
    batch,
    pesertaIds,
    affected: result.affected,
  };
}

  // src/peserta/peserta.service.ts
async updatePointSesiBulk(lombaId: number, data: UpdatePointSesiDto[]) {
  for (const dto of data) {
    const { pesertaId, sesi, finish, point } = dto;
    await this.pointSesiRepo
  .createQueryBuilder()
  .insert()
  .into(PointSesi)
  .values({
    peserta: { id_pendaftaran: pesertaId },
    sesi,
    finish: finish ?? undefined,   // ✅ jangan pakai null
    point: point ?? 0,
  })
  .orUpdate(['finish', 'point'], ['peserta', 'sesi'])
  .execute();

  }

  return { message: "Finish berhasil disimpan", count: data.length };
}

// src/peserta/peserta.service.ts
// src/peserta/peserta.service.ts
async updateFinishSesiBulk(lombaId: number, data: UpdatePointSesiDto[]) {
  for (const dto of data) {
    const { pesertaId, sesi, finish, point, penaltyPoint } = dto;

    // cari existing row untuk peserta + sesi
    const existing = await this.pointSesiRepo.createQueryBuilder('ps')
      .leftJoin('ps.peserta', 'peserta')
      .where('peserta.id_pendaftaran = :pesertaId', { pesertaId })
      .andWhere('ps.sesi = :sesi', { sesi })
      .getOne();

    if (existing) {
      // update fields yang diberikan
      if (finish !== undefined) existing.finish = finish;
      if (point !== undefined) existing.point = point;
      if (penaltyPoint !== undefined) existing.penaltyPoint = penaltyPoint;
      await this.pointSesiRepo.save(existing);
    } else {
      // insert baru
      const newRow = this.pointSesiRepo.create({
        peserta: { id_pendaftaran: pesertaId } as any,
        sesi,
        finish: finish ?? undefined,
        point: point ?? 0,
        penaltyPoint: penaltyPoint ?? 0,
      });
      await this.pointSesiRepo.save(newRow);
    }
  }

  return { message: 'Finish sesi berhasil disimpan', count: data.length };
}




async updateStatusPembayaran(
  lombaId: number,
  pesertaId: number,
  dto: UpdateStatusPembayaranDto,
) {
  const peserta = await this.pesertaRepo.findOne({
    where: { id_pendaftaran: pesertaId, lomba: { id: lombaId } },
  });

  if (!peserta) throw new BadRequestException('Peserta tidak ditemukan');

  peserta.statusPembayaran = dto.statusPembayaran;
  await this.pesertaRepo.save(peserta);

  return {
    message: 'Status pembayaran berhasil diperbarui',
    pesertaId,
    statusPembayaran: dto.statusPembayaran,
  };
}

// src/peserta/peserta.service.ts
async findBySesi(lombaId: number, sesi: number) {
  const peserta = await this.pesertaRepo
    .createQueryBuilder('peserta')
    .leftJoinAndSelect('peserta.pointSesi', 'pointSesi', 'pointSesi.sesi = :sesi', { sesi })
    .where('peserta.lomba_id = :lombaId', { lombaId })
    .getMany();

  return peserta.map(p => ({
    id_pendaftaran: p.id_pendaftaran,
    nama: p.nama,
    platNumber: p.plat_number,
    community: p.community,
    batch: p.batch,
    pointSesi: (p.pointSesi ?? []).map(ps => ({
      finish: ps.finish,
      penaltyPoint: ps.penaltyPoint,
      point: ps.point,
      sesi: ps.sesi,
      matchName: ps.matchName,
    })),
  }));
}

async updateMatchName(lombaId: number, dto: UpdateMatchNameDto) {
  const { pesertaId, sesi, matchName } = dto;

  // cari existing row
  const existing = await this.pointSesiRepo.createQueryBuilder('ps')
    .leftJoin('ps.peserta', 'peserta')
    .where('peserta.id_pendaftaran = :pesertaId', { pesertaId })
    .andWhere('ps.sesi = :sesi', { sesi })
    .getOne();

  if (existing) {
    existing.matchName = matchName;
    await this.pointSesiRepo.save(existing);
    return { message: 'Match name updated', pesertaId, sesi, matchName };
  }

  // insert baru kalau belum ada
  const newRow = this.pointSesiRepo.create({
    peserta: { id_pendaftaran: pesertaId } as any,
    sesi,
    matchName,
  });
  await this.pointSesiRepo.save(newRow);

  return { message: 'Match name created', pesertaId, sesi, matchName };
}


}





