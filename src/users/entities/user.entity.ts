import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Property({ unique: true, type: 'string' })
  email!: string;

  @Property({ type: 'string' })
  name!: string;

  @Property({ nullable: true, type: 'string' })
  bio?: string;

  @Property({ onCreate: () => new Date(), type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), type: 'datetime' })
  updatedAt: Date = new Date();
}
