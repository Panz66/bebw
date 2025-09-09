import { Test, TestingModule } from '@nestjs/testing';
import { PesanService } from './pesan.service';

describe('PesanService', () => {
  let service: PesanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PesanService],
    }).compile();

    service = module.get<PesanService>(PesanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
