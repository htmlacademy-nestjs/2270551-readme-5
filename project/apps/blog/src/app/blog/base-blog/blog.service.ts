import { Injectable } from '@nestjs/common';
import { VideoBlogRepository } from '../video-content/video-blog.repository';
import { TextBlogRepository } from '../text-content/text-blog.repository';
import { BaseBlogContentEntity } from './blog.entity';
import { BlogType } from '@project/libs/shared/app-types';
import { LinkBlogRepository } from '../link-content/link-blog.repository';
import { PhotoBlogRepository } from '../photo-content/photo-blog.repository';
import { QuoteBlogRepository } from '../quote-content/quote-blog.repository';
import { BLOG_REPOSITORY_MAP } from '../constants';

@Injectable()
export class BaseBlogContentService {
  constructor(
    private readonly videoBlogRepository: VideoBlogRepository,
    private readonly textBlogRepository: TextBlogRepository,
    private readonly linkBlogRepository: LinkBlogRepository,
    private readonly photoBlogRepository: PhotoBlogRepository,
    private readonly quoteBlogRepository: QuoteBlogRepository,
  ) {}

    public async save(type: BlogType, entity: BaseBlogContentEntity) {
      if (type) {
      return this[BLOG_REPOSITORY_MAP[type]].save(entity);
      }
      throw new Error('Not implements blog type');
    }

    public async findById(type: BlogType, id: string) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].save(id);
      }
      throw new Error('Not implements blog type');
    }

    public async update(type: BlogType, id: string, entity: BaseBlogContentEntity) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].update(id, entity);
      }
      throw new Error('Not implements blog type');
    }

    public async deleteById(type: BlogType, id: string) {
      if (type) {
        return this[BLOG_REPOSITORY_MAP[type]].deleteById(id);
      }
      throw new Error('Not implements blog type');
    }
}
