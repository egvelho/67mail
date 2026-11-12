import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class EmailWebhookDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsEmail()
  @IsNotEmpty()
  sender!: string;

  @IsString()
  @IsNotEmpty()
  to!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
