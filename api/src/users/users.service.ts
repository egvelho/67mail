import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.getEntityManager().flush();
    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password && updateUserDto.password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    } else {
      delete updateUserDto.password;
    }

    this.userRepository.assign(user, updateUserDto);
    await this.userRepository.getEntityManager().flush();

    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    const em = this.userRepository.getEntityManager();

    em.remove(user);
    await em.flush();

    return { message: `Usuário com ID ${id} removido com sucesso` };
  }
}
