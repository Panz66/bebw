/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly emailService : EmailService,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    const data = await this.repo.findOneBy({ id_pendaftaran : id });
    if (!data) {
      throw new NotFoundException(`User dengan ID ${id} tidak ditemukan`);
    }
    return data;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repo.create(dto);
    const saved = await this.repo.save(user);

    // Kirim email (simulasi)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.emailService.sendRegistrationEmail(saved.email, saved.nama); // tanpa await

    return saved;

  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const existing = await this.repo.findOneBy({ id_pendaftaran :id });
    if (!existing) throw new NotFoundException('User tidak ditemukan');

    const updated = this.repo.merge(existing, dto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User tidak ditemukan');
    }
  }
}

