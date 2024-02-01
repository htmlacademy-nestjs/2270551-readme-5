import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { VideoBlogRepository } from './video-content/video-blog.repository';
import { BaseBlogContentService } from './base-blog/blog.service';
import { TextBlogRepository } from './text-content/text-blog.repository';
import { LinkBlogRepository } from './link-content/link-blog.repository';
import { PhotoBlogRepository } from './photo-content/photo-blog.repository';
import { QuoteBlogRepository } from './quote-content/quote-blog.repository';
import { PrismaClientService } from '@project/libs/shared/blog/models';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [PrismaClientService, BlogService, BlogRepository, VideoBlogRepository, TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository, BaseBlogContentService],
  exports: [BlogRepository]
})
export class BlogModule {}
