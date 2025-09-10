/* eslint-disable prettier/prettier */
import 'dotenv/config';
import 'reflect-metadata'; // penting buat typeorm
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // scan semua entity
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true, // biar kelihatan query
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
