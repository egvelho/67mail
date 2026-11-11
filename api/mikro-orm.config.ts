import 'dotenv/config';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { defineConfig } from '@mikro-orm/postgresql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
});
