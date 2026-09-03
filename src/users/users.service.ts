import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.getEntityManager().flush();
    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
  }

  async remove(id: number) {
  }
}