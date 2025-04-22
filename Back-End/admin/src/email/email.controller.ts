import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ): Promise<{ message: string }> {
    if (!to || !subject || !text) {
      throw new BadRequestException('Missing required fields: to, subject, or text');
    }

    await this.emailService.sendEmail(to, subject, text);

    return { message: 'Email sent successfully' };
  }
}