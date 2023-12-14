import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/libs/shared/core';
import { LinkBlogEntity } from './link-blog.entity';

@Injectable()
export class LinkBlogRepository extends BaseMemoryRepository<LinkBlogEntity> {}
