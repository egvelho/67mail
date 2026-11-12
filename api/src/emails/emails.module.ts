import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { UsersModule } from '../users/users.module';
import { Email } from './entities/email.entity';
import { User } from '../users/entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [UsersModule, MikroOrmModule.forFeature([Email, User])],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
