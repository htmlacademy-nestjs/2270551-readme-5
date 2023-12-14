import { BlogStatus, BlogType, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/shared/app-types';

export type BlogContent = LinkBlogContent | TextBlogContent | VideoBlogContent | PhotoBlogContent | QuoteBlogContent;

export class UpdateBlogDto {
  content: BlogContent;
  postedDate: Date;
  status: BlogStatus;
  tags: string[];
}
