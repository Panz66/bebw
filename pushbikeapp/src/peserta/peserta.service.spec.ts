/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PesertaService } from './peserta.service';

describe('PesertaService', () => {
  let service: PesertaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PesertaService],
    }).compile();

    service = module.get<PesertaService>(PesertaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
