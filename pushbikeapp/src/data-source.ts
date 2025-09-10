/* eslint-disable prettier/prettier */
import 'dotenv/config';
import 'reflect-metadata'; // penting buat typeorm
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // scan semua entity
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true, // biar kelihatan query
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
