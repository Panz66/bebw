/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PesertaController } from './peserta.controller';
import { PesertaService } from './peserta.service';

describe('PesertaController', () => {
  let controller: PesertaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PesertaController],
      providers: [PesertaService],
    }).compile();

    controller = module.get<PesertaController>(PesertaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
