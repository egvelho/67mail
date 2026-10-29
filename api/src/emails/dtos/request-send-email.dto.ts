import { IsString } from 'class-validator';

export class RequestSendEmailDto {
  @IsString()
  to!: string;

  @IsString()
  toName!: string;

  @IsString()
  subject!: string;

  @IsString()
  content!: string;
}
