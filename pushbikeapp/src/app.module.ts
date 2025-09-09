/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
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
      host: process.env.DB_HOST || 'localhost', // default ke localhost (XAMPP)
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root', // default root
      password: process.env.DB_PASSWORD || '',      // default kosong di XAMPP
      database: process.env.DB_DATABASE || 'pushbikeweb', // default db name
      entities: [User],
      synchronize: false, // ⚠️ aktifkan hanya untuk development
      autoLoadEntities: true, // supaya semua entity diimport otomatis
      migrationsRun:true,
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
