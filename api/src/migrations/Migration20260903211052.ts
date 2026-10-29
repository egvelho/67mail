import { Migration } from '@mikro-orm/migrations';

export class Migration20260903211052 extends Migration {

  override name = 'Migration20260903211052';

  override up(): void | Promise<void> {
    this.addSql(`alter table \`users\` drop column \`bio\`;`);
    this.addSql(`alter table \`users\` drop column \`created_at\`;`);
    this.addSql(`alter table \`users\` drop column \`updated_at\`;`);
    this.addSql(`alter table \`users\` add column \`surname\` text not null;`);
    this.addSql(`alter table \`users\` add column \`password\` text not null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table \`users\` drop column \`surname\`;`);
    this.addSql(`alter table \`users\` drop column \`password\`;`);
    this.addSql(`alter table \`users\` add column \`bio\` text null;`);
    this.addSql(`alter table \`users\` add column \`created_at\` datetime not null;`);
    this.addSql(`alter table \`users\` add column \`updated_at\` datetime not null;`);
  }

}
