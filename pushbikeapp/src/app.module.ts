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
      host: process.env.MYSQLHOST,       // ⬅️ Railway var
      port: parseInt(process.env.MYSQLPORT || '3306', 10),
      username: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
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
