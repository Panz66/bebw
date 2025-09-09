/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe 
} from '@nestjs/common';
import { LombaService } from './lomba.service';
import { CreateLombaDto } from './dto/create-lomba.dto';
import { Lomba } from './entities/lomba.entity';
import { UpdateLombaDto } from './dto/update-lomba.dto';

@Controller('lomba')
export class LombaController {
  constructor(private readonly lombaService: LombaService) {}

  @Get()
  findAll(): Promise<Lomba[]> {
    return this.lombaService.findAll();
  }

  @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number): Promise<Lomba | null> {
  return this.lombaService.findOne(id);
}


  @Post()
  create(@Body() dto: CreateLombaDto): Promise<Lomba> {
    return this.lombaService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dto: UpdateLombaDto
  ) {
    return this.lombaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lombaService.remove(id);
  }

  @Post(':id/hasil')
simpanHasil(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: { moto: string; peserta: any[] },
) {
  return this.lombaService.simpanHasil(id, body.moto, body.peserta);
}

}
