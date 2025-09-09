/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { StatistikService } from "./statistik.service";

@Controller("statistik")
export class StatistikController {
  constructor(private readonly statistikService: StatistikService) {}

  @Get()
  async findAll() {
    return this.statistikService.getStatistik();
  }
}
