/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body() body: { email: string; nama: string }
  ): Promise<{ message: string }> {
    await this.emailService.sendRegistrationEmail(body.email, body.nama);
    return { message: `Email berhasil dikirim ke ${body.email}` };
  }
}
