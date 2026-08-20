import { defineConfig } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'my-db-name.sqlite3',
  extensions: [Migrator, SeedManager],
});
