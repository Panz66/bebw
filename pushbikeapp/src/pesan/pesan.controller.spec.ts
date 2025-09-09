/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PesanController } from './pesan.controller';
import { PesanService } from './pesan.service';

describe('PesanController', () => {
  let controller: PesanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesanController],
      providers: [PesanService],
    }).compile();

    controller = module.get<PesanController>(PesanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
