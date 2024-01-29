import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/libs/shared/core';
import { BlogEntity } from './blog.entity';
import { Blog, BlogStatus, BlogType } from '@project/libs/shared/app-types';
import { BlogQuery } from './query/blog-query';

@Injectable()
export class BlogRepository extends BaseMemoryRepository<BlogEntity> {
  find(param: BlogQuery) {
    throw new Error('Method not implemented.');
  }
  updateById(id: string, existBlog: BlogEntity, newBlogEntity: BlogEntity) {
    throw new Error('Method not implemented.');
  }
  repostById(userId: string, existBlog: BlogEntity) {
    throw new Error('Method not implemented.');
  }
  findUserInfo(userId: string) {
    throw new Error('Method not implemented.');
  }
}
