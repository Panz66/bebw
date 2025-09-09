/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendRegistrationEmail(email: string, nama: string): Promise<void> {
    console.log(`Mengirim email ke ${email} untuk ${nama}...`);

    await this.delay(3000); // simulasi delay 3 detik

    console.log(`Email ke ${email} berhasil dikirim: Selamat datang, ${nama}!`);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}


