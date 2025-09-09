/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatistikService } from "./statistik.service";
import { StatistikController } from "./statistik.controller";
import { Lomba } from "../lomba/entities/lomba.entity";
import { Peserta } from "../peserta/entities/peserta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lomba, Peserta])],
  providers: [StatistikService],
  controllers: [StatistikController],
})
export class StatistikModule {}
