import { Migration } from '@mikro-orm/migrations';

export class Migration20261105172240 extends Migration {

  override name = 'Migration20261105172240';

  override up(): void | Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "username" varchar(255) not null, "name" varchar(255) not null, "surname" varchar(255) not null, "password" varchar(255) not null);`);
    this.addSql(`alter table "users" add constraint "users_username_unique" unique ("username");`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }

}
