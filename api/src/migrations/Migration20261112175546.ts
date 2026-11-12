import { Migration } from '@mikro-orm/migrations';

export class Migration20261112175546 extends Migration {

  override name = 'Migration20261112175546';

  override up(): void | Promise<void> {
    this.addSql(`create table "emails" ("id" serial primary key, "subject" varchar(255) not null, "sender" varchar(255) not null, "content" text not null, "created_at" timestamptz not null, "user_id" int not null);`);

    this.addSql(`alter table "emails" add constraint "emails_user_id_foreign" foreign key ("user_id") references "users" ("id") on delete cascade;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "emails" cascade;`);
  }

}
