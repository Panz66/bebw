/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lomba } from "../lomba/entities/lomba.entity";
import { Peserta } from "../peserta/entities/peserta.entity";

@Injectable()
export class StatistikService {
  constructor(
    @InjectRepository(Lomba) private lombaRepo: Repository<Lomba>,
    @InjectRepository(Peserta) private pesertaRepo: Repository<Peserta>,
  ) {}

  async getStatistik() {
    const lombaList = await this.lombaRepo.find();

    const data = await Promise.all(
      lombaList.map(async (l) => {
        const pesertaCount = await this.pesertaRepo.count({
          where: { lomba: { id: l.id } },
        });
        return {
          id: l.id,
          nama: l.nama,
          pesertaCount,
        };
      })
    );

    return data;
  }
}
