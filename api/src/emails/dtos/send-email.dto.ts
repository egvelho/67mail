import { IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  from!: string;

  @IsString()
  fromName!: string;

  @IsString()
  to!: string;

  @IsString()
  toName!: string;

  @IsString()
  subject!: string;

  @IsString()
  content!: string;
}
