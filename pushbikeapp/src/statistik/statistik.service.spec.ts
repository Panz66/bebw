import { Test, TestingModule } from '@nestjs/testing';
import { StatistikService } from './statistik.service';

describe('StatistikService', () => {
  let service: StatistikService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatistikService],
    }).compile();

    service = module.get<StatistikService>(StatistikService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
