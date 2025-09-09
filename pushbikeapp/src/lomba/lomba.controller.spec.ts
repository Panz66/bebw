import { Test, TestingModule } from '@nestjs/testing';
import { LombaController } from './lomba.controller';
import { LombaService } from './lomba.service';

describe('LombaController', () => {
  let controller: LombaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LombaController],
      providers: [LombaService],
    }).compile();

    controller = module.get<LombaController>(LombaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
