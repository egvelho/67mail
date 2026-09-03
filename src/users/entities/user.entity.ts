import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Property({ unique: true, type: 'string' })
  email!: string;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  surname!: string;

  @Property({ type: 'string' })
  password!: string;
}
