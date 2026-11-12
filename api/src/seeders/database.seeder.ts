import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from './user.factory';
import { EmailFactory } from './email.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await new UserFactory(em).create(10);

    for (const user of users) {
      await new EmailFactory(em).create(20, { user });
    }
  }
}
