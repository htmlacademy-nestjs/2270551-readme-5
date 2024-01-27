import { BlogType, BlogContent, LinkBlogContent, PhotoBlogContent, QuoteBlogContent, TextBlogContent, VideoBlogContent } from '@project/libs/shared/app-types';
import { VideoBlogEntity } from '../video-content/video-blog.entity';
import { TextBlogEntity } from '../text-content/text-blog.entity';
import { LinkBlogEntity } from '../link-content/link-blog.entity';
import { PhotoBlogEntity } from '../photo-content/photo-blog.entity';
import { QuoteBlogEntity } from '../quote-content/quote-blog.entity';

export const baseBlogEntityFactory = (type: BlogType, content: BlogContent) => {
  switch(type) {
    case (BlogType.Video):
      return new VideoBlogEntity(content as VideoBlogContent);
      case (BlogType.Text):
        return new TextBlogEntity(content as TextBlogContent);
      case (BlogType.Link):
        return new LinkBlogEntity(content as LinkBlogContent);
      case (BlogType.Photo):
        return new PhotoBlogEntity(content as PhotoBlogContent);
      case (BlogType.Quote):
        return new QuoteBlogEntity(content as QuoteBlogContent);
      default:
      throw new Error('Not implements blog type');
  }
}
