import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name!: string;

  @IsNotEmpty({ message: 'O sobrenome não pode estar vazio' })
  surname!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  password!: string;
}