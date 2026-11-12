import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
} from '@mikro-orm/decorators/legacy';
import { Email } from '@/src/emails/entities/email.entity';
import { Collection } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Property({ unique: true, type: 'string' })
  username!: string;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  surname!: string;

  @Property({ type: 'string', hidden: false })
  password!: string;

  @OneToMany(() => Email, (email) => email.user, { hidden: true })
  emails = new Collection<Email>(this);
}
