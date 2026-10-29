import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { UsersService } from '../users/users.service';
import { SendEmailDto } from './dtos/send-email.dto';
import { RequestSendEmailDto } from './dtos/request-send-email.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailsService: EmailsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('send-email')
  async signIn(
    @Req() request: Request,
    @Body() requestSendEmailDto: RequestSendEmailDto,
  ) {
    const id = +request['user'].id;
    const user = await this.usersService.findOne(id);
    const from = `${user.username}@imeiou.com`;
    const fromName = `${user.name} ${user.surname}`;
    const sendEmailDto: SendEmailDto = {
      ...requestSendEmailDto,
      from,
      fromName,
    };
    return this.emailsService.sendEmail(sendEmailDto);
  }
}
