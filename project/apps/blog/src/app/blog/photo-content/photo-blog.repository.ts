import { Injectable } from '@nestjs/common';
import {BaseMemoryRepository} from '@project/libs/shared/core';
import { PhotoBlogEntity } from './photo-blog.entity';

@Injectable()
export class PhotoBlogRepository extends BaseMemoryRepository<PhotoBlogEntity> {}
