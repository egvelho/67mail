import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsEmail()
  @IsNotEmpty()
  sender!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  userId!: number;
}
