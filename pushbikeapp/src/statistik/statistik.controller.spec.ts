import { Test, TestingModule } from '@nestjs/testing';
import { StatistikController } from './statistik.controller';
import { StatistikService } from './statistik.service';

describe('StatistikController', () => {
  let controller: StatistikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatistikController],
      providers: [StatistikService],
    }).compile();

    controller = module.get<StatistikController>(StatistikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
