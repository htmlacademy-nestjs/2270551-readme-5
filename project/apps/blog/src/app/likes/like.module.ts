import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
//import { PrismaClient } from '@prisma/client'
import { PrismaClientService } from '@project/libs/shared/blog/models';
//import { PrismaClientService } from '../../../../../libs/shared/blog/models/src/lib/prisma-client.service';
import { BlogRepository } from '../blog/blog.repository';
import { BaseBlogContentService } from '../blog/base-blog/blog.service';
import { LinkBlogRepository } from '../blog/link-content/link-blog.repository';
import { PhotoBlogRepository } from '../blog/photo-content/photo-blog.repository';
import { QuoteBlogRepository } from '../blog/quote-content/quote-blog.repository';
import { TextBlogRepository } from '../blog/text-content/text-blog.repository';
import { VideoBlogRepository } from '../blog/video-content/video-blog.repository';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [LikeRepository,  LikeService, BlogRepository,  VideoBlogRepository, TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository, BaseBlogContentService],
})
export class LikeModule {}
