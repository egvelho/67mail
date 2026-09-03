import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) throw new ConflictException('E-mail já cadastrado');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = await this.usersService.create({ ...registerDto, password: hashedPassword });
    return { message: 'Conta criada com sucesso', user };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}