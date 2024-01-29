import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { LikeModule } from './likes/like.module';
import {BlogConfigModule} from '@project/libs/shared/config/blog';

@Module({
  imports: [BlogModule, LikeModule,BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
