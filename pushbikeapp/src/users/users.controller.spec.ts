/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */ 
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';

describe('UsersController', () => {
  let controller: UserController;

  // Mock UserService
  const mockUserService = {
    findAll: jest.fn(() => []),
    findOne: jest.fn((id: number) => ({ id_pendaftaran: id, nama: 'Test' })),
    create: jest.fn(dto => ({ id_pendaftaran: 1, ...dto })),
    update: jest.fn((id, dto) => ({ id_pendaftaran: id, ...dto })),
    remove: jest.fn((id: number) => ({ deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    expect(await controller.findAll()).toEqual([]);
  });
});
