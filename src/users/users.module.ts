import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthGuard } from '@/src/auth/auth.guard'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
})
export class UsersModule {}
