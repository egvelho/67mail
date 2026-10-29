import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dtos/send-email.dto';

@Injectable()
export class EmailsService {
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
        'api-key':
          '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',
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
}
