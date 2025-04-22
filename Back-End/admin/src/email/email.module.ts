import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  exports: [EmailService],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
