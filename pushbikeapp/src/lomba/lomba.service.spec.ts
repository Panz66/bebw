import { Test, TestingModule } from '@nestjs/testing';
import { LombaService } from './lomba.service';

describe('LombaService', () => {
  let service: LombaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LombaService],
    }).compile();

    service = module.get<LombaService>(LombaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
