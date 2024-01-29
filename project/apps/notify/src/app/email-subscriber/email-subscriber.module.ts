import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';

 @Module({
   imports: [
     MongooseModule.forFeature([
       { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
     ]),
   ],
   providers: [
     EmailSubscriberService,
     EmailSubscriberRepository,
   ]
 })
 export class EmailSubscriberModule {}