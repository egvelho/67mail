import { SendEmailDto } from './dtos/send-email.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '../users/entities/user.entity';
import { Email } from '../emails/entities/email.entity';
import { CreateEmailDto } from '../emails/dtos/create-email.dto';
import { EmailWebhookDto } from './dtos/email-webhook.dto';

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: EntityRepository<Email>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async sendEmail({
    from,
    fromName,
    to,
    toName,
    content,
    subject,
  }: SendEmailDto) {
    const url = 'https://api.brevo.com/v3/smtp/email';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.EMAIL_API_KEY ?? '',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: fromName,
          email: from,
        },
        to: [
          {
            email: to,
            name: toName,
          },
        ],
        subject,
        htmlContent: `<html><head></head><body>${content}</body></html>`,
      }),
    };

    const response = await fetch(url, options);
    const responseJson = await response.json();

    return responseJson;
  }

  async create(createEmailDto: CreateEmailDto) {
    const { userId, ...emailData } = createEmailDto;

    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const email = this.emailRepository.create({
      ...emailData,
      user,
      createdAt: new Date(),
    });

    await this.emailRepository.getEntityManager().flush();
    return email;
  }

  findAll() {
    return this.emailRepository.findAll({ populate: ['user'] });
  }

  async findOne(id: number) {
    const email = await this.emailRepository.findOne(
      { id },
      { populate: ['user'] },
    );
    if (!email) {
      throw new NotFoundException(`E-mail com ID ${id} não encontrado`);
    }
    return email;
  }

  async remove(id: number) {
    const email = await this.findOne(id);
    const em = this.emailRepository.getEntityManager();

    em.remove(email);
    await em.flush();

    return { message: `E-mail com ID ${id} removido com sucesso` };
  }

  async findAllByUser(userId: number) {
    return this.emailRepository.find(
      { user: userId },
      {
        orderBy: { createdAt: 'DESC' },
      },
    );
  }

  async findOneByUser(id: number, userId: number) {
    const email = await this.emailRepository.findOne(
      { id, user: { id: userId } },
      { populate: ['user'] },
    );

    if (!email) {
      throw new NotFoundException(
        `E-mail com ID ${id} não encontrado para este usuário`,
      );
    }
    return email;
  }

  async removeByUser(id: number, userId: number) {
    const email = await this.findOneByUser(id, userId);
    const em = this.emailRepository.getEntityManager();

    em.remove(email);
    await em.flush();

    return { message: `E-mail com ID ${id} removido com sucesso` };
  }

  async receiveEmailFromWebhook(dto: EmailWebhookDto) {
    const emailParts = dto.to.split('@');
    if (emailParts.length === 0 || !emailParts[0]) {
      throw new NotFoundException('Endereço de destino inválido.');
    }

    const username = emailParts[0].toLowerCase();

    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException(`Usuário '${username}' não encontrado.`);
    }

    const email = this.emailRepository.create({
      subject: dto.subject,
      sender: dto.sender,
      content: dto.content,
      user: user,
      createdAt: new Date(),
    });

    await this.emailRepository.getEntityManager().flush();
    return {
      success: true,
      message: 'E-mail recebido e salvo com sucesso.',
      emailId: email.id,
    };
  }
}
