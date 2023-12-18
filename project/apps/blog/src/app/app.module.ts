import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { LikeModule } from './likes/like.module';


@Module({
  imports: [BlogModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
