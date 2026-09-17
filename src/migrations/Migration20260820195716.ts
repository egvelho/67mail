import { Migration } from '@mikro-orm/migrations';

export class Migration20260820195716 extends Migration {

  override name = 'Migration20260820195716';

  override up(): void | Promise<void> {
    this.addSql(`create table \`users\` (\`id\` integer not null primary key autoincrement, \`email\` text not null, \`name\` text not null, \`bio\` text null, \`created_at\` datetime not null, \`updated_at\` datetime not null);`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists \`users\`;`);
  }

}
