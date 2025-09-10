/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { LombaModule } from './lomba/lomba.module';
import { PesertaModule } from './peserta/peserta.module';
import { PesanModule } from './pesan/pesan.module';
import { StatistikModule } from './statistik/statistik.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER,      // disesuaikan
      password: process.env.DB_PASS,      // disesuaikan
      database: process.env.DB_NAME,      // disesuaikan
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
    }),

    UsersModule,
    EmailModule,
    LombaModule,
    PesertaModule,
    PesanModule,
    StatistikModule,
  ],
})
export class AppModule {}
