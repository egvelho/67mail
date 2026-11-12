import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Request,
  Get,
  Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { UsersService } from '../users/users.service';
import { SendEmailDto } from './dtos/send-email.dto';
import { RequestSendEmailDto } from './dtos/request-send-email.dto';
import { AuthGuard } from '../auth/auth.guard';
import { EmailReceivedWebhookDto } from './dtos/email-received-webhook.dto';
import type { Response } from 'express';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailsService: EmailsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('send-email')
  async sendEmail(
    @Req() request: Request,
    @Body() requestSendEmailDto: RequestSendEmailDto,
  ) {
    const id = +request['user'].id;
    const user = await this.usersService.findOne(id);
    const from = `${user.username}@${process.env.EMAIL_DOMAIN}`;
    const fromName = `${user.name} ${user.surname}`;
    const sendEmailDto: SendEmailDto = {
      ...requestSendEmailDto,
      from,
      fromName,
    };
    return this.emailsService.sendEmail(sendEmailDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Req() request: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = request.user.id;
    const emails = await this.emailsService.findAllByUser(userId);

    res.setHeader('X-Total-Count', emails.length.toString());
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('Content-Type', 'application/json');

    return emails;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() request: Request & { user: { id: number } },
  ) {
    const userId = Number(request.user.id);
    const emailId = Number(id);

    const email = await this.emailsService.findOneByUser(emailId, userId);
    if (!email) {
      throw new NotFoundException(`E-mail com ID ${id} não encontrado.`);
    }

    return email;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() request: Request & { user: { id: number } },
  ) {
    const userId = Number(request.user.id);
    const emailId = Number(id);

    return this.emailsService.removeByUser(emailId, userId);
  }

  @Post('email-received')
  @HttpCode(HttpStatus.OK)
  async emailReceivedWebhook(@Body() emailWebhookDto: EmailReceivedWebhookDto) {
    if (emailWebhookDto.password !== process.env.EMAIL_WEBHOOK_PASSWORD) {
      throw new UnauthorizedException('Senha de webhook inválida.');
    }

    return this.emailsService.receiveEmailFromWebhook(emailWebhookDto);
  }
}
