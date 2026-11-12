import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
} from '@mikro-orm/decorators/legacy';
import type { Rel } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'emails' })
export class Email {
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Property({ type: 'string' })
  subject!: string;

  @Property({ type: 'string' })
  sender!: string;

  @Property({ type: 'text' })
  content!: string;

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt = new Date();

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user!: Rel<User>;
}
