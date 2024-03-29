import { Module } from '@nestjs/common';
 import { MailerModule } from '@nestjs-modules/mailer';

 import { MailService } from './mail.service';
 import { getMailerAsyncOptions } from '@project/libs/shared/helpers';

 @Module({
   imports: [
     MailerModule.forRootAsync(getMailerAsyncOptions('application.mail'))
   ],
   providers: [
     MailService
   ],
   exports: [
     MailService
   ]
 })
 export class MailModule {}
