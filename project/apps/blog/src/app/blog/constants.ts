export const NOT_CREATE_BLOG_CONTENT = 'Blog content can not created';
export const NOT_FOUND_BLOG = 'Blog not found';
export const NOT_FOUND_BLOG_CONTENT = 'Blog content not found';

import { BlogType } from '@project/libs/shared/app-types';

export const BLOG_REPOSITORY_MAP = {
  [BlogType.Video]: 'videoBlogRepository',
  [BlogType.Text]: 'textBlogRepository',
  [BlogType.Link]: 'linkBlogRepository',
  [BlogType.Photo]: 'photoBlogRepository',
  [BlogType.Quote]: 'quoteBlogRepository',
}
