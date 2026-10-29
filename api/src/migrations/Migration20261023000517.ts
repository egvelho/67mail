import { Migration } from '@mikro-orm/migrations';

export class Migration20261023000517 extends Migration {

  override name = 'Migration20261023000517';

  override up(): void | Promise<void> {
    this.addSql(`drop index \`users_email_unique\`;`);
    this.addSql(`alter table \`users\` rename column \`email\` to \`username\`;`);
    this.addSql(`create unique index \`users_username_unique\` on \`users\` (\`username\`);`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop index \`users_username_unique\`;`);
    this.addSql(`alter table \`users\` rename column \`username\` to \`email\`;`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);
  }

}
