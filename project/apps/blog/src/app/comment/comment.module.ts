import { Module } from '@nestjs/common';
import { PrismaClientService } from '@project/libs/shared/blog/models';
import { BlogRepository } from '../blog/blog.repository';
import { BaseBlogContentService } from '../blog/base-blog/blog.service';
import { LinkBlogRepository } from '../blog/link-content/link-blog.repository';
import { PhotoBlogRepository } from '../blog/photo-content/photo-blog.repository';
import { QuoteBlogRepository } from '../blog/quote-content/quote-blog.repository';
import { TextBlogRepository } from '../blog/text-content/text-blog.repository';
import { VideoBlogRepository } from '../blog/video-content/video-blog.repository';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService, PrismaClientService, BlogRepository, VideoBlogRepository, TextBlogRepository, LinkBlogRepository, PhotoBlogRepository, QuoteBlogRepository, BaseBlogContentService],
})
export class CommentModule {}
