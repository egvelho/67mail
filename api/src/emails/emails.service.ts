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
}
