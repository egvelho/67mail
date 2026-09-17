import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { User } from '@/src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UserFactory extends Factory<User> {
  model = User;

  definition(): Partial<User> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('monark', salt);

    return {
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
    };
  }
}
