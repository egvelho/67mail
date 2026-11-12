import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Email } from '../emails/entities/email.entity';

export class EmailFactory extends Factory<Email> {
  model = Email;

  definition(): Partial<Email> {
    return {
      subject: faker.lorem.sentence({ min: 3, max: 8 }),
      sender: faker.internet.email(),
      content: faker.lorem.paragraphs(2),
      createdAt: faker.date.recent(),
    };
  }
}
